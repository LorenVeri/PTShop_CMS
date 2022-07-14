const ViewModal = function () {
    const self = this;

    self.showtoastState = function (msg, title) {
    };

    self.showtoastError = function (msg, title) {
    };

    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        return newObj;
    }

    //Go to ViewDetail Admin
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

    var e, t, n, r, o = document.getElementById("kt_table_users")
    //"use strict"; var KTUsersList = function () {
    //    c = () => {
    //        o.querySelectorAll('[data-kt-users-table-filter="delete_row"]').forEach((t => {
    //            t.addEventListener("click", (function (t) {
    //                t.preventDefault(); const n = t.target.closest("tr"), r = n.querySelectorAll("td")[1].querySelectorAll("a")[1].innerText;
    //            }))
    //        }))
    //    }, l = () => { const c = o.querySelectorAll('[type="checkbox"]'); t = document.querySelector('[data-kt-user-table-toolbar="base"]'), n = document.querySelector('[data-kt-user-table-toolbar="selected"]'), r = document.querySelector('[data-kt-user-table-select="selected_count"]'); const s = document.querySelector('[data-kt-user-table-select="delete_selected"]'); c.forEach((e => { e.addEventListener("click", (function () { setTimeout((function () { a() }), 50) })) })), s.addEventListener("click", (function () { Swal.fire({ text: "Are you sure you want to delete selected customers?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, delete!", cancelButtonText: "No, cancel", customClass: { confirmButton: "btn fw-bold btn-danger", cancelButton: "btn fw-bold btn-active-light-primary" } }).then((function (t) { t.value ? Swal.fire({ text: "You have deleted all selected customers!.", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" } }).then((function () { c.forEach((t => { t.checked && e.row($(t.closest("tbody tr"))).remove().draw() })); o.querySelectorAll('[type="checkbox"]')[0].checked = !1 })).then((function () { a(), l() })) : "cancel" === t.dismiss && Swal.fire({ text: "Selected customers was not deleted.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" } }) })) })) }; const a = () => { const e = o.querySelectorAll('tbody [type="checkbox"]'); let c = !1, l = 0; e.forEach((e => { e.checked && (c = !0, l++) })), c ? (r.innerHTML = l, t.classList.add("d-none"), n.classList.remove("d-none")) : (t.classList.remove("d-none"), n.classList.add("d-none")) }; return { init: function () { o && (o.querySelectorAll("tbody tr").forEach((e => { const t = e.querySelectorAll("td"), n = t[3].innerText.toLowerCase(); let r = 0, o = "minutes"; n.includes("yesterday") ? (r = 1, o = "days") : n.includes("mins") ? (r = parseInt(n.replace(/\D/g, "")), o = "minutes") : n.includes("hours") ? (r = parseInt(n.replace(/\D/g, "")), o = "hours") : n.includes("days") ? (r = parseInt(n.replace(/\D/g, "")), o = "days") : n.includes("weeks") && (r = parseInt(n.replace(/\D/g, "")), o = "weeks"); const c = moment().subtract(r, o).format(); t[3].setAttribute("data-order", c); const l = moment(t[5].innerHTML, "DD MMM YYYY, LT").format(); t[5].setAttribute("data-order", l) })), (e = $(o).DataTable({ info: !1, order: [], pageLength: 10, lengthChange: !1, columnDefs: [{ orderable: !1, targets: 0 }, { orderable: !1, targets: 6 }] })).on("draw", (function () { l(), c(), a() })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) { e.search(t.target.value).draw() })), document.querySelector('[data-kt-user-table-filter="reset"]').addEventListener("click", (function () { document.querySelector('[data-kt-user-table-filter="form"]').querySelectorAll("select").forEach((e => { $(e).val("").trigger("change") })), e.search("").draw() })), c(), (() => { const t = document.querySelector('[data-kt-user-table-filter="form"]'), n = t.querySelector('[data-kt-user-table-filter="filter"]'), r = t.querySelectorAll("select"); n.addEventListener("click", (function () { var t = ""; r.forEach(((e, n) => { e.value && "" !== e.value && (0 !== n && (t += " "), t += e.value) })), e.search(t).draw() })) })()) } }
    //}(); KTUtil.onDOMContentLoaded((function () { KTUsersList.init() }));
    "use strict"; var KTModalExportUsers = function () { const t = document.getElementById("kt_modal_export_users"), e = t.querySelector("#kt_modal_export_users_form"), n = new bootstrap.Modal(t); return { init: function () { !function () { var o = FormValidation.formValidation(e, { fields: { format: { validators: { notEmpty: { message: "File format is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); const i = t.querySelector('[data-kt-users-modal-action="submit"]'); i.addEventListener("click", (function (t) { t.preventDefault(), o && o.validate().then((function (t) { console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () { i.removeAttribute("data-kt-indicator"), Swal.fire({ text: "User list has been successfully exported!", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then((function (t) { t.isConfirmed && (n.hide(), i.disabled = !1) })) }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })), t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (function (t) { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })), t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (function (t) { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })) }() } } }(); KTUtil.onDOMContentLoaded((function () { KTModalExportUsers.init() }));
    "use strict"; var KTUsersAddUser = function () { const t = document.getElementById("kt_modal_add_user"), e = t.querySelector("#kt_modal_add_user_form"), n = new bootstrap.Modal(t); return { init: function () { (() => { var o = FormValidation.formValidation(e, { fields: { user_name: { validators: { notEmpty: { message: "Full name is required" } } }, user_email: { validators: { notEmpty: { message: "Valid email address is required" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }); const i = t.querySelector('[data-kt-users-modal-action="submit"]'); i.addEventListener("click", (t => { t.preventDefault(), o && o.validate().then((function (t) { console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () { i.removeAttribute("data-kt-indicator"), i.disabled = !1, Swal.fire({ text: "Form has been successfully submitted!", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then((function (t) { t.isConfirmed && n.hide() })) }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })), t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })), t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (t => { t.preventDefault(), Swal.fire({ text: "Are you sure you would like to cancel?", icon: "warning", showCancelButton: !0, buttonsStyling: !1, confirmButtonText: "Yes, cancel it!", cancelButtonText: "No, return", customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" } }).then((function (t) { t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({ text: "Your form has not been cancelled!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }) })) })) })() } } }(); KTUtil.onDOMContentLoaded((function () { KTUsersAddUser.init() }));

    self.showMenuAction = () => {
        $('#menu-dropdown').toggleClass('show menu-dropdown');
        $('#action-menu').toggleClass('show');
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

    //Get Admin
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
                              phone
                              password
                              createdAt
                              updatedAt
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
        self.getAdmin();
        self.getAccount();
    }
}

$(function () {
    const viewModal = new ViewModal();
    viewModal.callApi();
    ko.applyBindings(viewModal);
})