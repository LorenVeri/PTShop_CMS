const ViewModal = function () {
    const self = this;

    "use strict"; var KTProjectList = {
        init: function () {
            !function () {
                var t = document.getElementById("kt_project_list_chart"); if (t) {
                    var e = t.getContext("2d"); new Chart(e, {
                        type: "doughnut", data: {
                            datasets: [{ data: [2, 2, 3, 4], backgroundColor: ["#FFC700", "#00A3FF", "#50CD89", "#f1416c"] }], labels: ["Chờ xử lý", " Đang xử lý", "Hoàn Thành", "Chưa thanh toán"]
                        }, options: {
                            chart: { fontFamily: "inherit" },
                            cutout: "75%",
                            cutoutPercentage: 65,
                            responsive: !0,
                            maintainAspectRatio: !1,
                            title: { display: !1 },
                            animation: { animateScale: !0, animateRotate: !0 },
                            tooltips: { enabled: !0, intersect: !1, mode: "nearest", bodySpacing: 5, yPadding: 10, xPadding: 10, caretPadding: 0, displayColors: !1, backgroundColor: "#20D489", titleFontColor: "#ffffff", cornerRadius: 4, footerSpacing: 0, titleSpacing: 0 },
                            plugins: { legend: { display: !1 } }
                        }
                    })
                }
            }()
        }
    }; KTUtil.onDOMContentLoaded((function () { KTProjectList.init() }));

    self.formatToVND = function (total) {
        var vnd = parseFloat(total());
        return vnd.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    self.showtoastState = function (msg, title) {
    };

    self.showtoastError = function (msg, title) {
    };

    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        return newObj;
    }

    //Go to View Detail Order
    self.gotoItem = function (item) {
        self.getRoleById(item.id());
        window.location.href = '/admin/' + item.id() + '-' + self.slugifyLink(item.name());
    }

    self.slugifyLink = function (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        // remove accents, swap ñ for n, etc
        var from = "áàảãạăẵẳằắặâẫẩầấậđéẽèẻèêễếềểệíìỉĩịóòõỏọôỗồổốộơỡởờớợúũùủụưữửừứựýỹỷỳỵ·/_,:;";
        var to = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyy------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return str;
    }


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
                              avatar
                              firstName
                              lastName
                              email
                              phone
                              password
                              createdAt
                              updatedAt
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

    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let endDayOfMonth = moment(month).endOf('month');;

    let startDay = `01/${month}/${year}`;

    let endDay = `${endDayOfMonth}/${month}/${year}`;

    //Get All Order
    self.first = ko.observable(100);
    self.totalOrder = ko.observable();
    self.totalAdmin = ko.observable();
    self.totalAdminAfter = ko.observable();
    self.amountOrder = ko.observable();
    self.orderList = ko.observableArray([]);
    self.getOrder = () => {
        const query = `query($startDay: String!, $endDay: String!) {
                          transactionByMonth(first: 100,startDay: $startDay, endDay: $endDay) {
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
        self.orderList.removeAll();
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "endDay": endDay,
                    "startDay": startDay
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    self.totalOrder(res.data.transactionByMonth.totalCount);
                    let amount = 0;

                    let amountOrder = 0;
                    $.each(res.data.transactionByMonth.nodes, function (ex, item) {
                        if (item.transactionProcessings > 10) {
                            self.totalAdminAfter(item.transactionProcessings[10]);
                            self.totalAdmin(item.transactionProcessings[10]);
                        } else {
                            self.totalAdmin(item.transactionProcessings)
                        }
                        amount += item.amount;
                        self.orderList.push(self.convertToKoObject(item));
                    });
                    self.amountOrder(amount);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //state = 1
    //Get Order Wait Processing

    self.totalOrderWait = ko.observable();
    self.amountOrderWait = ko.observable();
    self.orderWaitList = ko.observableArray([]);
    self.getOrderWait = () => {
        const query = `query($startDay: String!, $endDay: String!) {
                          transactionByMonth(first: 100, where: {state: {eq: 1}},startDay: $startDay, endDay: $endDay) {
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
                            }
                          }
                        }
                       `
        self.orderList.removeAll();
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "endDay": endDay,
                    "startDay": startDay
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    self.totalOrderWait(res.data.transactionByMonth.totalCount);
                    let amount = 0;
                    chartData.push(self.totalOrderWait())
                    $.each(res.data.transactionByMonth.nodes, function (ex, item) {
                        amount += item.amount;
                        self.orderWaitList.push(self.convertToKoObject(item));
                    });
                    self.amountOrderWait(amount);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //state = 2
    //Get Order Processing
    self.totalOrderProcessing = ko.observable();
    self.amountOrderProcessing = ko.observable();
    self.orderProcessingList = ko.observableArray([]);
    self.getOrderProcessing = () => {
        const query = `query($startDay: String!, $endDay: String!) {
                          transactionByMonth(first: 100, where: {state: {eq: 2}},startDay: $startDay, endDay: $endDay) {
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
                            }
                          }
                        }
                       `
        self.orderList.removeAll();
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "endDay": endDay,
                    "startDay": startDay
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    self.totalOrderProcessing(res.data.transactionByMonth.totalCount);
                    let amount = 0;
                    chartData.push(self.totalOrderProcessing())
                    $.each(res.data.transactionByMonth.nodes, function (ex, item) {
                        amount += item.amount;
                        self.orderProcessingList.push(self.convertToKoObject(item));
                    });
                    self.amountOrderProcessing(amount);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //state = 3
    //Get Order Complete
    self.totalOrderComplete = ko.observable();
    self.amountOrderComplete = ko.observable();
    self.orderCompleteList = ko.observableArray([]);
    self.getOrderComplete = () => {
        const query = `query($startDay: String!, $endDay: String!) {
                          transactionByMonth(first: 100, where: {state: {eq: 3}},startDay: $startDay, endDay: $endDay) {
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
                            }
                          }
                        }
                       `
        self.orderList.removeAll();
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "endDay": endDay,
                    "startDay": startDay
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    self.totalOrderComplete(res.data.transactionByMonth.totalCount);
                    let amount = 0;
                    chartData.push(self.totalOrderComplete())
                    $.each(res.data.transactionByMonth.nodes, function (ex, item) {
                        amount += item.amount;
                        self.orderCompleteList.push(self.convertToKoObject(item));
                    });
                    self.amountOrderComplete(amount);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //state = 0
    //Get Order Unpaid
    self.totalOrderUnpaid = ko.observable();
    self.amountOrderUnpaid = ko.observable();
    self.orderUnpaidList = ko.observableArray([]);
    self.getOrderUnpaid = () => {
        const query = `query($startDay: String!, $endDay: String!) {
                          transactionByMonth(first: 100, where: {state: {eq: 0}},startDay: $startDay, endDay: $endDay) {
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
                            }
                          }
                        }
                       `
        self.orderList.removeAll();
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "endDay": endDay,
                    "startDay": startDay
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    self.totalOrderUnpaid(res.data.transactionByMonth.totalCount);
                    chartData.push(self.totalOrderUnpaid())
                    let amount = 0;

                    $.each(res.data.transactionByMonth.nodes, function (ex, item) {
                        amount += item.amount;
                        self.orderUnpaidList.push(self.convertToKoObject(item));
                    });
                    self.amountOrderUnpaid(amount);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    let chartData = [];

    //Action
    self.DeleteAdminAccount = (item) => {
        Swal.fire({
            text: "Bạn có muốn xóa " + item.fullName() + "?",
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
            t.value ? self.deleteAccount(item) : "cancel" === t.dismiss
        }))
    }

    self.deleteAccount = (item) => {
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `mutation($id: Int!) {
                          deleteAdmin(id: $id)
                        }
                       `,
                variables: {
                    "id": 8
                }
            }),
            success: function (res) {
                console.log()
                if (res.data.deleteAdmin == true) {
                    Swal.fire({
                        title: "Thành công!", text: "Đã xóa" + item.fullName() + "!.", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" }
                    })
                    self.getAdmin();
                } else {
                    Swal.fire({
                        title: "Có lỗi, xóa thất bại!",
                        icon: "error", buttonsStyling: !1,
                        confirmButtonText: "Thử lại",
                        customClass: { confirmButton: "btn fw-bold btn-primary" }
                    })
                }

            },
            error: function (err) {
                Swal.fire({
                    title: "Có lỗi, xóa thất bại!",
                    icon: "error", buttonsStyling: !1,
                    confirmButtonText: "Thử lại",
                    customClass: { confirmButton: "btn fw-bold btn-primary" }
                })
            }
        });
    }

    self.callApi = function () {
        self.getAccount();
        self.getOrderWait();
        self.getOrderProcessing();
        self.getOrderComplete();
        self.getOrderUnpaid();
        self.getOrder();
    }

}

$(function () {
    const viewModal = new ViewModal();
    viewModal.callApi();
    ko.applyBindings(viewModal);
})