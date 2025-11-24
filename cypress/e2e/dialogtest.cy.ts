// describe('template spec', () => {
//   it('passes', () => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MGJjOTM4NS0wYjJhLTRmN2QtODQ3MC00MzIwMjliYTVjNDEiLCJlbWFpbCI6ImFjY2VsZGV2Y29AZ21haWwuY29tIiwiaWF0IjoxNzU5OTkxMzY5LCJleHAiOjE3NjA1OTYxNjl9.yYMMNXsrRd2cPmC2nG4k7cMuKO4yIMDlxir4W5pejLI';

//     // ابتدا سایت را باز کن تا Cypress بدونه دامنه چیست
//     cy.visit('http://localhost:3000', { failOnStatusCode: false });

//     // بعد از باز شدن، کوکی را ست کن
//     cy.setCookie('token', token);

//     // برای اطمینان می‌تونی کوکی را بررسی کنی
//     cy.getCookie('token').should('have.property', 'value', token);
//   });
// });
