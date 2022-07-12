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
        self.getAdminById(id);
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

    //Get Role
    //Detail Role
    self.first = ko.observable(100);
    self.adminById = ko.observable();
    self.getAdminById = function (id) {
        const query = `query ($data: Int!) {
                          admin(first: 1, where: { id: { eq: $data } }) {
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
                    `
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "data": id
                }
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    $.each(res.data.admin.nodes, function (ex, item) {
                        item.fullName = item.firstName + " " + item.lastName;
                        self.adminById(self.convertToKoObject(item));
                    })
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
    }

    //Action Role
    self.selectedRole = ko.observable();
    self.listPermission = ko.observableArray([]);

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

}

$(function () {
    const viewModal = new ViewModal();
    viewModal.callApi();
    ko.applyBindings(viewModal);
})