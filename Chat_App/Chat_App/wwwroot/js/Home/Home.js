const ViewModal = function () {
    const self = this;

    self.convertToKoObject = function (data) {
        var newObj = ko.mapping.fromJS(data);
        return newObj;
    }

    self.formatToVND = function (total) {
        var vnd = parseFloat(total);
        return total().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };


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

    //Get Category
    self.categoryList = ko.observableArray();
    self.getCategory = function () {
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query {
                          category(first:  12 ) {
                            nodes {
                              name
                            }
                          }
                        }
                       `
            }),
            success: function (res) {
                self.categoryList([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.category.nodes, function (ex, item) {
                        self.categoryList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //Get Prodcut
    self.productList = ko.observableArray();
    self.getProduct = function () {
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query {
                          product(first: ${self.first()}) {
                            totalCount
                            nodes {
                              id
                              name
                              price
                              productPrices {
                                price
                                productId
                                product {
                                    name
                                }
                              }
                              productMedia {
                                uri
                                productId
                                product {
                                    name
                                }
                              }
                              category {
                                name
                              }
                            }
                          }
                        }
                       `
            }),
            success: function (res) {
                self.productList([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.product.nodes, function (ex, item) {
                        var salePrice = ((item.price - item.productPrices[0].price) / item.price) * 100;
                        var discount = String(salePrice.toFixed(0)) + "%";
                        item.discount = ko.observable(discount);
                        self.productList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //GetBanner
    self.bannerList = ko.observableArray();
    self.getBanner = function () {
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query {
                          banner(first: 2) {
                            totalCount
                            nodes {
                              title
                              uri
                            }
                          }
                        }
                       `
            }),
            success: function (res) {
                self.bannerList([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.banner.nodes, function (ex, item) {
                        self.bannerList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //GetContact
    self.contactList = ko.observableArray();
    self.getContact = function () {
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query {
                          contact {
                            totalCount
                            nodes {
                              name
                              phone
                              email
                              address
                            }
                          }
                        }
                       `
            }),
            success: function (res) {
                self.contactList([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.contact.nodes, function (ex, item) {
                        self.contactList.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //Get Product by IsDelete
    self.listProductIsDelete = ko.observableArray()
    self.productIsDelete = function () {
        const query = `query{
                      product(where: {isDelete:{eq: true}}){
                        nodes {
                          id
                          name
                          price
                          productPrices {
                            price
                            product {
                                    name
                                }
                          }
                          productMedia {
                            uri
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
                query: query
            }),
            success: function (res) {
                self.listProductIsDelete([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.product.nodes, function (ex, item) {
                        self.listProductIsDelete.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //Get Product by Sale
    self.listProductSale = ko.observableArray()
    self.productIsSale = function () {
        const data = {
            name: "",
            status: true,
            sale: true
        }
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query{
                      product(where: {sale:{eq: true}}, first: 3){
                        nodes {
                            id
                          name
                          price
                          productPrices {
                            price
                             product {
                                      name
                                    }
                          }
                          productMedia {
                            uri
                          }
                        }
                      }
                    }
                       `,
                variables: { data }
            }),
            success: function (res) {
                self.listProductSale([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.product.nodes, function (ex, item) {
                        self.listProductSale.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    self.first = ko.observable(100)
    //Get Product by Sale
    self.listProductStatus = ko.observableArray()
    self.productIsStatus = function () {
        const data = {
            name: "",
            status: true,
            sale: true
        }
        $.ajax({
            method: "POST",
            url: backendUrl + "/graphql",
            contentType: "application/json",
            data: JSON.stringify({
                query: `query{
                      product(where: {status:{eq: true}}, first: 3){
                        nodes {
                            id
                            name
                          price
                          productPrices {
                            price
                            product {
                                    name
                                }
                          }
                          productMedia {
                            uri
                          }
                        }
                      }
                    }
                       `,
                variables: { data }
            }),
            success: function (res) {
                self.listProductStatus([]);
                if (res.data.totalCount != 0) {
                    $.each(res.data.product.nodes, function (ex, item) {
                        self.listProductStatus.push(self.convertToKoObject(item));
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    self.callApi = function () {
        self.getBanner();
        self.getContact();
        self.getProduct();
        self.getCategory();
        self.productIsStatus();
        self.productIsSale();
        self.productIsDelete();
        self.getAccount();
    }

    self.saveCookie = function (cart) {
        let d = new Date();
        $(cart).each(function (ex, item) {
            item = JSON.stringify(item);
        });
        document.cookie = "cart=" + cart + "; expires=Thu, 30 Dec 2022 12:00:00 UTC ;path=/";
    }

    let cookies = document.cookie;
    //console.log(cookies);

    self.keySearch = ko.observable();
    self.gotoSearch = function () {
        window.location.href = '/search?keysearch=' + self.keySearch();
    }
}

$(function () {
    const viewModal = new ViewModal();
    viewModal.callApi();
    ko.applyBindings(viewModal);
})