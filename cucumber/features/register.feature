Feature: Register into losestudiantes
    As an user I want to create a new account in losestudiantes website in order to use the features of the site

Scenario Outline: Register failed with wrong inputs

  Given I go to losestudiantes home screen for registering
  When I open the login screen
  And I register with <name>, <lastname>, <email>, <password>, <accept_terms>
  And I press register button
  Then I expect to see <error>

  Examples:
    | name      | lastname  | email                   | password   | accept_terms | error                  |
    | charlie   | tester    |                         | test1234   | true         | Ingresa tu correo      |
    | charlie   | tester    | charlie@mailinator.com  |            | true         | Ingresa una contraseña |
    | charlie   | tester    | charlie@mailinator.com  | test1234   | false        | Debes aceptar los      |


Scenario Outline: Register failed because user exists

  Given I go to losestudiantes home screen for registering
  When I open the login screen
  And I register with <name>, <lastname>, <email>, <password>, <accept_terms>
  And I press register button
  Then I expect already exists user

  Examples:
    | name      | lastname  | email                   | password   | accept_terms | error                  |
    | charlie   | tester    | charlie@mailinator.com  | test1234   | true         | Error: Ya existe un us |