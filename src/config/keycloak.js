import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "navii-admin",
 clientId: "app-order-admin",
});

export default keycloak;