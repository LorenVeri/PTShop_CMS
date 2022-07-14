const ViewModal = function () {
    const self = this;

    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        return newObj;
    }

    //Go to ViewDetail AdminGroup
    self.getUrl = function () {
        var urlArray = window.location.href.substring(window.location.href.lastIndexOf('#') + 1).split("/");
        var id = urlArray[urlArray.length - 1].split("-")[0];
        id = Number(id);
        self.getOrderById(id);
    }

    self.showtoastSuccess = function (msg, title) {
        Swal.fire({
            title: msg,
            text: title,
            icon: "success", buttonsStyling: !1,
            confirmButtonText: "OK!",
            customClass: { confirmButton: "btn fw-bold btn-primary" }
        })
    };

    self.showtoastError = function (msg, title) {
        Swal.fire({
            title: msg,
            text: title,
            icon: "error", buttonsStyling: !1,
            confirmButtonText: "OK!",
            customClass: { confirmButton: "btn fw-bold btn-primary" }
        })
    };


    //Get Account
    self.account = ko.observable()
    self.getAccount = () => {
        let id = Cookies.get('AdminId');
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query($data: Int!) {
                          admin(first: 1, where: {id: {eq: $data}}) {
                            totalCount
                            nodes {
                              id
                              avatar
                              firstName
                              lastName
                              email
                              phone
                              password
                              createdAt
                              updatedAt
                             adminGroup {
                                    name
                                    id
                                  }
                            }
                          }
                        }
                       `,
                variables: {
                    "data": Number(id)
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    $.each(res.data.admin.nodes, function (ex, item) {
                        item.fullName = item.firstName + " " + item.lastName;
                        self.account(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    self.formatToVND = function (total) {
        var vnd = parseFloat(total());
        return vnd.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    //Get All Order
    self.first = ko.observable(100);
    self.totalOrder = ko.observable();
    self.totalAdmin = ko.observable();
    self.totalAdminAfter = ko.observable();
    self.amountOrder = ko.observable();
    self.orderById = ko.observable();
    self.getOrderById = (id) => {
        let date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let endDayOfMonth = moment(month).endOf('month');;

        let startDay = `01/${month}/${year}`;

        let endDay = `${endDayOfMonth}/${month}/${year}`;

        const query = `query($startDay: String!, $endDay: String!, $id: Int!) {
                          transactionByMonth(where: {id: {eq: $id}},startDay: $startDay, endDay: $endDay) {
                            totalCount                            
                            nodes {
                              id
                              useId
                              userName
                              userEmail
                              userPhone
                              userAdress
                              passersby
                              amount
                              message
                              state
                              createdAt
                              orders {
                                transactionId
                                productId
                                count
                                amountOrder
                                status
                              }
                              transactionProcessings {
                                admin {
                                    id
                                    firstName
                                    lastName
                                    avatar
                                    adminGroup {
                                    name
                                   }
                                }
                              }
                            }
                          }
                        }
                       `
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "endDay": endDay,
                    "startDay": startDay,
                    "id": id
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    self.totalOrder(res.data.transactionByMonth.totalCount);
                    let amount = 0;

                    $.each(res.data.transactionByMonth.nodes, function (ex, item) {
                        if (item.transactionProcessings > 10) {
                            self.totalAdminAfter(item.transactionProcessings[10]);
                            self.totalAdmin(item.transactionProcessings[10]);
                        } else {
                            self.totalAdmin(item.transactionProcessings)
                        }
                        amount += item.amount;
                        self.orderById(self.convertToKoObject(item));
                    });
                    self.amountOrder(amount);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }


    self.callApi = function () {
        self.getUrl();
        self.getAccount();
        self.filterAdmin()
    }

    //Action Role
    self.confirmDeletePermission = (item) => {
        swal.fire({
            text: "Bạn có muốn gỡ " + item.role.name() + " ?",
            icon: "warning",
            showCancelButton: !0,
            buttonsStyling: !1,
            confirmButtonText: "Xác nhận!",
            cancelButtonText: "Hủy",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary"
            }
        }).then((function (t) {
            self.deletePermission(item)
        }))
    }

    self.deletePermission = (item) => {
        const query = `mutation ($id: Int!) {
                          deletePermission(id: $id)
                        }
                        `
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "id": item.id()
                }
            }),
            success: function (res) {
                if (res.data.deletePermission) {
                    self.roleList.removeAll();
                    self.getRole();
                    $('#kt_modal_add_role').modal('hide');
                    self.showtoastSuccess('Thành công', `Đã gỡ ${item.name()}`)
                } else {
                    self.showtoastError('Thất bại', `Vui lòng thử lại`)
                }
            },
            error: function (err) {
                self.showtoastError('Thất bại', `Vui lòng thử lại`)
            }
        });
    }

    self.calendarOrder = () => {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            timeZone: 'UTC',
            initialView: 'dayGridMonth',
            events: 'https://fullcalendar.io/api/demo-feeds/events.json',
            editable: true,
            selectable: true,
            eventClick: function (info) {
                info.el.style.borderColor = 'red';
                $('#kt_modal_add_schedule').modal('show');
            }
        });
        calendar.render();
    }

    //get Admin
    self.first = ko.observable(100);
    self.adminList = ko.observableArray([]);
    self.getAdmin = () => {
        self.adminList.removeAll();
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query {
                          admin(first: 100, order: {updatedAt:DESC}) {
                            totalCount
                            nodes {
                              id
                              avatar
                              firstName
                              lastName
                              email
                              adminGroup {
                                 name
                                 class
                               }
                            }
                          }
                        }
                       `
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    $.each(res.data.admin.nodes, function (ex, item) {
                        item.selected = false;
                        item.fullName = item.firstName + " " + item.lastName;
                        self.adminList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //Thêm người xử lý đơn hàng
    self.createTransactionProcessing = (id) => {
        var obj = {

        }
        const query = `mutation($data: TransactionProcessingTypeInput!) {
                          createTransactionProcessing(item: $data)
                        } 
                       `
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "data": obj
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {

                }
            },
            error: function (err) {
            }
        });
    }

    self.filterAdmin = () => {
        $("#search-value").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#adminTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }
}

$(function () {
    const viewModal = new ViewModal();
    viewModal.callApi();
    ko.applyBindings(viewModal);
})