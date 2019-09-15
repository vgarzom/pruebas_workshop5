//Complete siguiendo las instrucciones del taller
var { defineSupportCode } = require('cucumber');
var { expect } = require('chai');

defineSupportCode(({ Given, When, Then }) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if (browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When('I open the login screen', () => {
    browser.waitUntil(() => {
      return !browser.isExisting('modal-body');
    });
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');
  });

  When('I fill a wrong email and password', () => {
    var cajaLogIn = browser.element('.cajaLogIn');

    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys('wrongemail@example.com');

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys('123467891')
  });

  When('I try to login', () => {
    var cajaLogIn = browser.element('.cajaLogIn');
    cajaLogIn.element('button=Ingresar').click()
  });

  When(/^I fill with (.*) and (.*)$/, (email, password) => {
    var cajaLogIn = browser.element('.cajaLogIn');

    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys(email);

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password)
  });

  Then('I expect to see {string}', error => {
    browser.waitForVisible('.aviso.alert.alert-danger', 5000);
    var alertText = browser.element('.aviso.alert.alert-danger').getText();
    expect(alertText).to.include(error);
  });

  Then('I expect to not be able to login', () => {
    browser.waitForVisible('.aviso.alert.alert-danger', 5000);
  });

  Then('I wait for account button', () => {
    browser.waitForVisible('#cuenta', 5000);
  })

  // ----------------------------------------------------------------

  Given('I go to losestudiantes home screen for registering', () => {
    browser.url('/');
    if (browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When(/^I register with (.*), (.*), (.*), (.*), (.*)$/, (name, lastname, email, password, accept_terms) => {
    var cajaSignUp = browser.element('.cajaSignUp');

    var nameInput = cajaSignUp.element('input[name="nombre"]');
    nameInput.click();
    nameInput.keys(name);

    var lastnameInput = cajaSignUp.element('input[name="apellido"]');
    lastnameInput.click();
    lastnameInput.keys(lastname);

    var emailInput = cajaSignUp.element('input[name="correo"]');
    emailInput.click();
    emailInput.keys(email);

    var passwordInput = cajaSignUp.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password);

    try {
      var selectPrograma = cajaSignUp.element('select[name="idPrograma"]');
      selectPrograma.selectByVisibleText('Arte');
    } catch (err) {
      console.log("err", err);
    }
    //var option = selectPrograma.selectByAttribute("value", "12");
    //option.click();

    if (accept_terms === "true") {
      var acceptInput = cajaSignUp.element('input[name="acepta"]');
      acceptInput.click();
    }
  });

  When('I press register button', () => {
    var cajaSignUp = browser.element('.cajaSignUp');
    cajaSignUp.element('button=Registrarse').click()
  });

  When('I open the register screen', () => {
    browser.waitUntil(() => {
      return !browser.isExisting('modal-body');
    });
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');
  });

  Then('I expect a register error {string}', error => {
    browser.waitForVisible('.aviso.alert.alert-danger', 5000);
    var alertText = browser.element('.aviso.alert.alert-danger').getText();
    expect(alertText).to.include(error);
  });

  Then('I expect already exists user', () => {
    browser.waitForVisible('.sweet-alert', 5000);
    var alertText = browser.element('.text-muted.lead').getText();
    expect(alertText).to.include("Error: Ya existe un usuario");
  });


});