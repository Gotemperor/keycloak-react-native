import { RNKeycloak } from '@react-keycloak/native';

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
    url: 'https://idp.grasp.systems:8443/auth',
    realm: 'local-test',
    clientId: 'client1',
});


export default keycloak;
