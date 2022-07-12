var ViewModel = function () {
    var self = this;
    self.mode = ko.observable('');
    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        newObj.Selected = ko.observable(false);
        return newObj;
    }
    self.convertToJson = function (item) {
        if (item == null || item == "") {
            return [];
        } else {
            return JSON.parse(item);
        }
    };
    self.convertToJsonString = function (data) {
        return JSON.stringify(data)
    }

    self.accountValue = ko.observable();
    self.setAccountValue = () => {
        let obj = {
            email: '',
            password: '',
        }

        self.accountValue(self.convertToKoObject(obj));
    }

    self.confirmValue = () => {
        e.addEventListener("click",
            (function (n) {
                n.preventDefault(), i.validate().then((function (i) {
                    "Valid" == i ? (e.setAttribute("data-kt-indicator", "on"), e.disabled = !0, setTimeout(
                        (function () {
                            e.removeAttribute("data-kt-indicator"), e.disabled = !1,
                                self.loginAdmin()
                        }), 2e3))
                        : Swal.fire
                            ({
                                text: "Bạn chưa nhập email hoặc mật khẩu",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Thử lại!",
                                customClass: { confirmButton: "btn btn-primary" }
                            })
                }))
            }))
    }

    self.loginAdmin = () => {
        const query = `query($data: AdminTypeInput!) {
                          login(item: $data) {
                            nodes {
                              id
                            }
                          }
                        }`
        let obj = {
            email: self.accountValue().email(),
            password: self.accountValue().password()
        }

        console.log(obj);


        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: query,
                variables: {
                    "data": {
                        "input": JSON.stringify(obj)
                    }
                }
            }),
            success: function (res) {
                if (res.data.login.nodes.length > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công',
                        showConfirmButton: false,
                        timer: 1000,
                    }).then((function (e) {
                        document.cookie = `AdminId=${res.data.login.nodes[0].id}`;
                        setTimeout(window.location.href = "/Home", 3000);
                    }))
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'Sai mật khẩu hoặc Email!',
                        timer: 1000
                    })
                }
            },
            error: function (err) {
                console.log(err);
                swal.fire({
                    icon: 'error',
                    title: 'Có lỗi',
                    text: 'Đăng nhập thất bại!',
                    timer: 1500
                })
            }
        });
    }

    var t, e, i;

    "use strict"; var KTSigninGeneral = function () {
        return {
            init: function () {
                t = document.querySelector("#kt_sign_in_form"),
                    e = document.querySelector("#kt_sign_in_submit"),
                    i = FormValidation.formValidation(t, { fields: { email: { validators: { notEmpty: { message: "Vui lòng nhập email" }, emailAddress: { message: "Định dạng email không đúng" } } }, password: { validators: { notEmpty: { message: "Vui lòng nhập mật khẩu" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row" }) } })
            }
        }
    }(); KTUtil.onDOMContentLoaded((function () { KTSigninGeneral.init() }));

}
$(function () {
    var viewModel = new ViewModel();
    viewModel.setAccountValue();
    viewModel.confirmValue();
    ko.applyBindings(viewModel);
});