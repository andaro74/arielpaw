using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Web.WebPages.OAuth;
using AP.WebUI.Models;

namespace AP.WebUI
{
    public static class AuthConfig
    {
        public static void RegisterAuth()
        {
            // To let users of this site log in using their accounts from other sites such as Microsoft, Facebook, and Twitter,
            // you must update this site. For more information visit http://go.microsoft.com/fwlink/?LinkID=252166

            //OAuthWebSecurity.RegisterMicrosoftClient(
            //    clientId: "",
            //    clientSecret: "");

            OAuthWebSecurity.RegisterTwitterClient(
                consumerKey: "U6yAz2DNHlk8PoTx3U1qOXz7L",
                consumerSecret: "J7tOO4a9NDbzBisrCeSdNt0wHriv9XU5TaxFO9QbETvTcUnfRL");

            OAuthWebSecurity.RegisterFacebookClient(
                appId: "329761607170995",
                appSecret: "093501f2358a78294e5b2eb929faf4f8");

            OAuthWebSecurity.RegisterGoogleClient();
        }
    }
}
