const ViewModal = function () {
    const self = this;

    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        return newObj;
    }

    //Go to ViewDetail AdminGroup
    self.gotoItem = function (item) {
        self.getRoleById(item.id());
        window.location.href = '/chi-tiet/' + item.id() + '-' + self.slugifyLink(item.name());
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

    "use strict"; var KTUsersAddRole = function () {
        const t = document.getElementById("kt_modal_add_role"), e = t.querySelector("#kt_modal_add_role_form"), n = new bootstrap.Modal(t); return {
            init: function () {
                (() => {
                    var o = FormValidation.formValidation(e, { fields: { role_name: { validators: { notEmpty: { message: "Role name is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); t.querySelector('[data-kt-roles-modal-action="close"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to close?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, close it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value && n.hide() })) })), t.querySelector('[data-kt-roles-modal-action="cancel"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })); const r = t.querySelector('[data-kt-roles-modal-action="submit"]'); r.addEventListener("click", (function (t) {
                        t.preventDefault(), o && o.validate().then(

                        )
                    }))
                })(), (() => {
                })()
            }
        }
    }(); KTUtil.onDOMContentLoaded((function () { KTUsersAddRole.init() }));

    "use strict"; var KTUsersUpdatePermissions = function () {
        const t = document.getElementById("kt_modal_update_role"), e = t.querySelector("#kt_modal_update_role_form"), n = new bootstrap.Modal(t); return {
            init: function () {
                (() => {
                    var o = FormValidation.formValidation(e, { fields: { role_name: { validators: { notEmpty: { message: "Role name is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); t.querySelector('[data-kt-roles-modal-action="close"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to close?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, close it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value && n.hide() })) })), t.querySelector('[data-kt-roles-modal-action="cancel"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })); const i = t.querySelector('[data-kt-roles-modal-action="submit"]'); i.addEventListener("click", (function (t) {
                        t.preventDefault(), o && o.validate().then(
                        )
                    }))
                })(), (() => {
                })()
            }
        }
    }(); KTUtil.onDOMContentLoaded((function () { KTUsersUpdatePermissions.init() }));


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
    self.first = ko.observable(100);
    self.filterRole = ko.observable("{name: DESC}")
    self.roleList = ko.observableArray([]);
    self.getRole = function () {
        self.roleList.removeAll();
        const query = `query {
                          adminGroup(first: 100, order: ${self.filterRole()}) {
                            totalCount
                            nodes {
                              id
                              name
                              code
                              admins {
                                id
                              }
                              permissions {
                                id
                                roleId
                                role {
                                  name
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
                    $.each(res.data.adminGroup.nodes, function (ex, item) {
                        item.totalUser = item.admins.length;
                        self.roleList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    self.first = ko.observable(100);
    self.permissionList = ko.observableArray([]);
    self.getPermission = function () {
        self.permissionList.removeAll();
        const query = `query {
                      role(first: 100, order: {name: DESC}) {
                        totalCount
                        nodes {
                          id
                          name
                          createdAt
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
                        item.selected = false;
                        self.permissionList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    self.callApi = function () {
        self.getAccount();
        self.getPermission();
        self.getRole();
    }

    //Action Role

    self.selectAll = () => {
        var KTUsersAddRole = function () {
            const t = document.getElementById("kt_modal_add_role"), e = t.querySelector("#kt_modal_add_role_form"), n = new bootstrap.Modal(t); return {
                init: function () {
                    (() => { var o = FormValidation.formValidation(e, { fields: { role_name: { validators: { notEmpty: { message: "Role name is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); t.querySelector('[data-kt-roles-modal-action="close"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to close?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, close it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value && n.hide() })) })), t.querySelector('[data-kt-roles-modal-action="cancel"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })); const r = t.querySelector('[data-kt-roles-modal-action="submit"]'); r.addEventListener("click", (function (t) { t.preventDefault(), o && o.validate().then((function (t) { console.log("validated!"), "Valid" == t ? (r.setAttribute("data-kt-indicator", "on"), r.disabled = !0, setTimeout((function () { r.removeAttribute("data-kt-indicator"), r.disabled = !1, Swal.fire({ text: "Form has been successfully submitted!", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then((function (t) { t.isConfirmed && n.hide() })) }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })) })(), (() => {

                    })()
                }
            }
        }(); KTUtil.onDOMContentLoaded((function () { KTUsersAddRole.init() }));
    }

    self.selectedRole = ko.observable();
    self.addObjectRole = () => {
        let obj = {
            id: 0,
            name: "",
            code: "",
            permissions: []
        }
        self.selectedRole(self.convertToKoObject(obj));
    }

    self.listPermission = ko.observableArray([]);
    self.editObjectRole = (item) => {
        $.each(self.permissionList(), function (id, permission) {
            permission.selected(false);
        })
        $.each(item.permissions(), function (ex, per) {
            $.each(self.permissionList(), function (id, permission) {
                if (per.roleId() == permission.id()) {
                    permission.selected(true)
                }
            })
        })
        self.listPermission(item.permissions())
        self.selectedRole(item);
    }

    self.createRole = () => {

        if (self.selectedRole().name().length == 0) {
            self.showtoastError('Chưa nhập tên chức danh')
        } else {
            let listPermissions = []

            $.each(self.permissionList(), function (ex, item) {
                if (item.selected() == true) {
                    let obj = {
                        id: 0,
                        adminGroupId: self.selectedRole().id(),
                        roleId: item.id()
                    }
                    listPermissions.push(obj)
                }
            });



            let role = {
                id: self.selectedRole().id(),
                name: self.selectedRole().name(),
                code: self.selectedRole().code(),
                listPermissions: listPermissions
            }

            console.log(role);

            const query = `mutation($data: AdminGroupTypeInput!) {
                              createAdminGroup(item: $data)
                            }`
            $.ajax({
                method: "POST",
                url: backendUrl + "/graphql",
                contentType: "application/json",
                data: JSON.stringify({
                    query: query,
                    variables: {
                        "data": role
                    }
                }),
                success: function (res) {
                    if (res.data.createAdminGroup == "true") {
                        if (self.selectedRole().id() == 0) {
                            self.roleList.removeAll();
                            self.getRole();
                            $('#kt_modal_add_role').modal('hide');
                            self.showtoastSuccess('Thành công', `Đã thêm mới ${self.selectedRole().name()}`)
                        } else {
                            self.roleList.removeAll();
                            self.getRole();
                            $('#kt_modal_update_role').modal('hide');
                            self.showtoastSuccess('Thành công', `Đã cập nhật ${self.selectedRole().name()}`)
                        }
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

    self.confirmDeleteRole = (item) => {
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
            self.deleteRole(item)
        }))
    }

    self.deleteRole = (item) => {
        const query = `mutation ($id: Int!) {
                          deleteAdminGroup(id: $id)
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
                if (res.data.deleteAdminGroup) {
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

    //Detail Role
    //Get Role
    self.roleById = ko.observable();
    self.getRoleById = function (id) {
        self.roleList.removeAll();
        const query = `query {
                          adminGroup(where: {id:{eq: $id}}) {
                            totalCount
                            nodes {
                              id
                              name
                              code
                              admins {
                                id
                              }
                              permissions {
                                id
                                roleId
                                role {
                                  name
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
                    $.each(res.data.adminGroup.nodes, function (ex, item) {
                        item.totalUser = item.admins.length;
                        self.roleById(self.convertToKoObject(item));
                    })
                    console.log(self.roleById());
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}

$(function () {
    const viewModal = new ViewModal();
    viewModal.callApi();
    ko.applyBindings(viewModal);
})