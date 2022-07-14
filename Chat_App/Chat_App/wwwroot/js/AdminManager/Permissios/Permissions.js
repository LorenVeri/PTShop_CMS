const ViewModal = function () {
    const self = this;

    "use strict"; var KTUsersAddPermission = function () {
        const t = document.getElementById("kt_modal_add_permission"),
            e = t.querySelector("#kt_modal_add_permission_form"),
            n = new bootstrap.Modal(t); return {
                init: function () {
                    (() => {
                        var o = FormValidation.formValidation(e, { fields: { permission_name: { validators: { notEmpty: { message: "Permission name is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); t.querySelector('[data-kt-permissions-modal-action="close"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Bạn muốn đóng form ?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Đồng ý!", cancelButtonText: "Quay lại", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value && n.hide() })) })), t.querySelector('[data-kt-permissions-modal-action="cancel"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Bạn muốn hủy tạo mới quyền?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Đồng ý!", cancelButtonText: "Quay lại", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) }));
                    })()
                }
            }
    }(); KTUtil.onDOMContentLoaded((function () { KTUsersAddPermission.init() }));
    "use strict"; var KTUsersUpdatePermission = function () { const t = document.getElementById("kt_modal_update_permission"), e = t.querySelector("#kt_modal_update_permission_form"), n = new bootstrap.Modal(t); return { init: function () { (() => { var o = FormValidation.formValidation(e, { fields: { permission_name: { validators: { notEmpty: { message: "Permission name is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); t.querySelector('[data-kt-permissions-modal-action="close"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Bạn muốn đóng form?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Đồng ý!", cancelButtonText: "Quay lại", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value && n.hide() })) })), t.querySelector('[data-kt-permissions-modal-action="cancel"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Bạn muốn hủy cập nhật?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Đồng ý!", cancelButtonText: "Quay lại", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })); const i = t.querySelector('[data-kt-permissions-modal-action="submit"]'); i.addEventListener("click", (function (t) { t.preventDefault(), o && o.validate().then((function (t) { console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () { i.removeAttribute("data-kt-indicator"), i.disabled = !1, Swal.fire({ text: "Form has been successfully submitted!", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then((function (t) { t.isConfirmed && n.hide() })) }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })) })() } } }(); KTUtil.onDOMContentLoaded((function () { KTUsersUpdatePermission.init() }));


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


    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        return newObj;
    }

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


    //Get Permissions
    self.filterRole = ko.observable("{name: DESC}")
    self.first = ko.observable(100);
    self.permissionList = ko.observableArray([]);
    self.getPermission = function () {
        self.permissionList.removeAll();
        const query = `query {
                      role(first: 100, order: ${self.filterRole()}) {
                        totalCount
                        nodes {
                          id
                          name
                          createdAt
                          permissions {
                            adminGroup {
                              id
                              name
                              class
                            }
                          }
                        }
                      }
                    }`
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query
            }),
            success: function (res) {
                if (res.data.totalCount != 0) {
                    $.each(res.data.role.nodes, function (ex, item) {
                        self.permissionList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //Action Permission
    self.selectedPermission = ko.observable();
    self.objAddPermission = () => {
        let permission = {
            id: 0,
            name: " "
        }
        self.selectedPermission(self.convertToKoObject(permission));
    }

    self.objEditPermission = (item) => {
        self.selectedPermission(item);
        //$('#kt_modal_update_permission').addClass('show');
    }

    self.createPermission = () => {
        console.log(self.selectedPermission().name());
        if (self.selectedPermission().name().length == 0) {
            self.showtoastError('Chưa nhập tên quyền')
        } else {
            let permission = {
                id: self.selectedPermission().id(),
                name: self.selectedPermission().name()
            }
            const query = `mutation($data: RoleTypeInput!) {
                              createRole(item: $data)
                            }`
            $.ajax({
                method: "POST",
                url: backendUrl + "/graphql",
                contentType: "application/json",
                data: JSON.stringify({
                    query: query,
                    variables: {
                        "data": permission
                    }
                }),
                success: function (res) {
                    if (res) {
                        if (self.selectedPermission().id() == 0) {
                            self.selectedPermission().name(" ");
                            self.showtoastSuccess('Thành công', `Đã thêm mới ${permission.name}`)
                        } else {
                            const t = document.getElementById("kt_modal_add_permission"),
                                n = new bootstrap.Modal(t)
                            n.hide()
                            self.showtoastSuccess('Thành công', `Đã cập nhật ${permission.name}`)
                        }
                    } else {
                        self.showtoastError('Thất bại', `Vui lòng thử lại`)
                    }

                    self.getPermission();
                },
                error: function (err) {
                    self.showtoastError('Thất bại', `Vui lòng thử lại`)
                }
            });
        }
    }

    self.callApi = function () {
        self.getAccount();
        self.getPermission();
        self.filterPermission();
    }

    self.filterPermission = () => {
        $("#search-value").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#permissionTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }

    self.confirmDeletePermission = (item) => {
        swal.fire({
            text: "Bạn có muốn xóa " + item.name() + " ?",
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
        const query = `mutation($id: Int!) {
                          deleteRole(id: $id)
                        }`
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
                self.getPermission();
                if (res.data.deleteRole == "false") {
                    self.showtoastError('Thất bại', `Vui lòng thử lại`)
                } else {
                    self.showtoastSuccess('Thành công', `Đã xóa ${item.name()}`)
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