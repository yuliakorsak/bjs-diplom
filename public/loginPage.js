"use strict";

const form = new UserForm();

form.loginFormCallback = data => {
  ApiConnector.login(data, result => {
    if (result.success) {
      location.reload();
    }
    else {
      form.setLoginErrorMessage(result.error);
    }
  });
};

form.registerFormCallback = data => {
  ApiConnector.register(data, result => {
    if (result.success) {
      location.reload();
    }
    else {
      form.setRegisterErrorMessage(result.error);
    }
  });
};