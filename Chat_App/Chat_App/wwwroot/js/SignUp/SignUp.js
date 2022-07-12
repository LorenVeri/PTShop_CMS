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
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
        }

        self.accountValue(self.convertToKoObject(obj));
    }

    self.confirmValue = () => {
        t.addEventListener("click", (function (r) {
            r.preventDefault(), a.revalidateField("password"), a.validate().then((function (a) {
                "Valid" == a ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = !0, setTimeout((function () {
                    t.removeAttribute("data-kt-indicator"), t.disabled = !1,
                        self.createAdmin()
                }), 1500))
                    :
                    Swal.fire({
                        title: 'Có lỗi',
                        text: "Có vẻ như bạn chưa nhập đủ thông tin, vui lòng thử lại. ",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Thử lại!",
                        customClass: { confirmButton: "btn btn-primary" }
                    })
            }))
        })), e.querySelector('input[name="password"]').addEventListener("input", (function () { this.value.length > 0 && a.updateFieldStatus("password", "NotValidated") }))
    }

    self.createAdmin = () => {
        console.log(self.accountValue());
        const query = `mutation($data: AdminTypeInput!) {
                          createAdmin(item: $data) 
                        }`

        let obj = {
            firstName: self.accountValue().firstName(),
            lastName: self.accountValue().lastName(),
            email: self.accountValue().email(),
            phone: Number(self.accountValue().phone()),
            password: self.accountValue().password()
        }

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
                if (res.data.createAdmin == 'Email đã tồn tại') {
                    swal.fire({
                        icon: 'error',
                        title: 'Tạo tài khoản thất bại!',
                        text: 'Địa chỉ email đã tồn tại, vui lòng thử lại',
                        timer: 1500
                    })
                } else {
                    if (res.data.createAdmin == 'Thành công') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tạo tài khoản thành công',
                            showConfirmButton: false,
                            timer: 1500,
                        }).then((function (e) {
                            setTimeout(window.location.href = "/Login", 3000);
                        }))
                    } else {
                        swal.fire({
                            icon: 'error',
                            title: 'Có lỗi',
                            text: 'Tạo tài khoản thất bại!',
                            timer: 1500
                        }).then((function (e) {
                            e.isConfirmed && (t.querySelector('[name="email"]').value = "", t.querySelector('[name="password"]').value = "", t.querySelector('[name="confirm-password"]').value = "")
                        }))
                    }
                }
            },
            error: function (err) {
                console.log(err);
                swal.fire({
                    icon: 'error',
                    title: 'Có lỗi',
                    text: 'Tạo tài khoản thất bại!',
                    timer: 1500
                })
            }
        });
    }


    var e = document.querySelector("#kt_sign_up_form");
    var t = document.querySelector("#kt_sign_up_submit");
    var s = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]'));
    var a;
    var r;
    "use strict"; var KTSignupGeneral = function () {
        a, r = function () { return 100 === s.getScore() };
        return {
            init: function () {
                a = FormValidation.formValidation(e, {
                    fields: {
                        "first-name": { validators: { notEmpty: { message: "Tên là bắt buộc" } } }, "last-name": { validators: { notEmpty: { message: "Họ là bắt buộc" } } }, email: { validators: { notEmpty: { message: "Email là bắt buộc" }, emailAddress: { message: "Địa chỉ email không hợp lệ" } } }, password: {
                            validators: {
                                notEmpty: { message: "Mật khẩu là bắt buộc" }, callback: {
                                    message: "Vui lòng nhập mật khẩu hợp lệ", callback: function (e) {
                                        if (e.value.length > 0)
                                            return r()
                                    }
                                }
                            }
                        }, "confirm-password": { validators: { notEmpty: { message: "Xác nhận mật khẩu là bắt buộc" }, identical: { compare: function () { return e.querySelector('[name="password"]').value }, message: "Mật khẩu và mật khẩu xác nhận không giống nhau" } } }, toc: { validators: { notEmpty: { message: "Bạn phải chấp nhận điều khoản" } } }
                    }, plugins: { trigger: new FormValidation.plugins.Trigger({ event: { password: !1 } }), bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) }
                })
            }
        }
    }(); KTUtil.onDOMContentLoaded((function () { KTSignupGeneral.init() }));
}
$(function () {
    var viewModel = new ViewModel();
    viewModel.setAccountValue();
    viewModel.confirmValue();
    ko.applyBindings(viewModel);
});