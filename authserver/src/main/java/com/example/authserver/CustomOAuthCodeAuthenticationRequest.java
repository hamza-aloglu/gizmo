package com.example.authserver;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AuthorizationCodeRequestAuthenticationContext;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AuthorizationCodeRequestAuthenticationException;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AuthorizationCodeRequestAuthenticationToken;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

import java.util.function.Consumer;

public class CustomOAuthCodeAuthenticationRequest implements Consumer<OAuth2AuthorizationCodeRequestAuthenticationContext> {
    @Override
    public void accept(OAuth2AuthorizationCodeRequestAuthenticationContext authenticationContext) {
        OAuth2AuthorizationCodeRequestAuthenticationToken authenticationToken = authenticationContext.getAuthentication();
        RegisteredClient client = authenticationContext.getRegisteredClient();

        String uri = authenticationToken.getRedirectUri();

        if (!client.getRedirectUris().contains(uri)) {
            OAuth2Error error = new OAuth2Error(OAuth2ErrorCodes.INVALID_REDIRECT_URI);
            throw new OAuth2AuthorizationCodeRequestAuthenticationException(error, authenticationToken);
        }
    }
}
