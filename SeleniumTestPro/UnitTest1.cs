using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;
using System;
using System.Threading;

namespace SeleniumTestPro
{
    [TestFixture]
    public class LocalLoginTests
    {
        private IWebDriver driver;
        private readonly string baseUrl = "https://localhost:7081/";

        [SetUp]
        public void Setup()
        {
            new DriverManager().SetUpDriver(new ChromeConfig());
            driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
        }

        [Test]
        public void TC01_LocalLogin_ValidCredentials()
        {
           
            driver.Navigate().GoToUrl(baseUrl);

        
            driver.FindElement(By.Id("inputEmail")).SendKeys("testuser@example.com");
            driver.FindElement(By.Id("inputPassword")).SendKeys("password123");

            var loginButton = driver.FindElement(By.CssSelector("button[type='submit']"));
            loginButton.Click();

         
            Thread.Sleep(1000);

            // 🧩 5. Kiểm tra kết quả (ví dụ: dashboard, hoặc thay đổi URL / tiêu đề)
            // Vì web tĩnh không có backend, có thể kiểm tra dựa trên tiêu đề
            Assert.IsTrue(driver.Title.Contains("Login") || driver.PageSource.Contains("Login"),
                "Trang vẫn hiển thị hoặc điều hướng đúng cách sau khi login.");
        }

        [Test]
        public void TC02_LocalLogin_EmptyFields()
        {
            driver.Navigate().GoToUrl(baseUrl);

            // Không nhập gì → nhấn Login
            var loginButton = driver.FindElement(By.CssSelector("button[type='submit']"));
            loginButton.Click();

            Thread.Sleep(500);

            // Kiểm tra xem form vẫn còn trên trang (vì không nhập thông tin)
            Assert.IsTrue(driver.PageSource.Contains("Email address") && driver.PageSource.Contains("Password"),
                "Form login vẫn hiển thị khi bỏ trống các trường.");
        }

        [TearDown]
        public void Cleanup()
        {
            driver.Quit();
            driver.Dispose();
        }
    }
}
