describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Nivedita Rao',
      username: 'nroar',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.get('#username').invoke('attr','placeholder').should('contain','Username')
    cy.get('#password').invoke('attr','placeholder').should('contain','Password')
    cy.get('button').should('contain','Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('nroar')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('Nivedita Rao logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('nroar')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.get('#notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Nivedita Rao logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'nroar', password: 'secret' })
      })

      it('navigation bar is shown', function () {
        cy.get('#top-nav').should('contain','Blogs')
          .and('contain','Users')
          .and('contain','logout')
          .and('contain','Nivedita Rao logged-in')
      })

      it('navigation works', function (){
        cy.url().should('not.include','/users')
        cy.get('#top-nav').contains('Users').click()
        cy.url().should('include','/users')
        cy.get('#user-list').contains('Nivedita Rao')
        cy.get('#top-nav').contains('Blogs').click()
        cy.url().should('not.include','/users')
        cy.get('html').contains('Create new blog')
      })

      it('can logout successfully', function (){
        cy.contains('Nivedita Rao logged-in')
        cy.contains('logout')
        cy.get('#logout-btn').click()
        cy.url().should('include','/login')
      })

      it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Humane guide to debugging')
        cy.get('#author').type('Juha-Matti Santala')
        cy.get('#url').type('https://hamatti.org/guides/humane-guide-to-debugging/#console-table')
        cy.get('#create-button').click()
        cy.get('.blog-list').should('contain','Humane guide to debugging')
          .and('contain','Juha-Matti Santala')
        cy.get('#notification')
          .should('contain','A new blog Humane guide to debugging by Juha-Matti Santala was added to the list')
          .and('have.css', 'background-color', 'rgb(212, 237, 218)')
          .and('have.css', 'border-style', 'solid')
      })

      describe('and some blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'a very interesting blog',
            author: 'someone smart',
            url: 'https://justgoogleityourself.com',
            likes: 20
          })
          cy.createBlog({
            title: 'another very interesting blog',
            author: 'someone interesting',
            url: 'https://imsureyoullfinditsomewhere.com',
            likes: 10
          })
          cy.createBlog({
            title: 'an awesome blog',
            author: 'someone awesome',
            url: 'https://icantrememberwho.com',
            likes: 5
          })
        })
        it('a blog can be liked', function () {
          cy.contains('another very interesting blog').click()
          cy.get('#like-button').click()
          cy.contains('likes 11')
        })
        it('a comment can be added to a blog', function (){
          cy.contains('an awesome blog').click()
          cy.url().should('include','/blogs')
          cy.get('input[name=\'comment\']').type('This awesome blog is just awesome')
          cy.get('#comment-btn').click()
          cy.get('#comment-list').should('contain','This awesome blog is just awesome')
        })
        it('a blog created by the user can be deleted', function () {
          cy.contains('a very interesting blog').click()
          cy.url().should('include','/blogs')
          cy.get('html').should('contain','added by Nivedita Rao')
          cy.get('#remove-button').click()
          cy.url().should('not.include','/blogs')
          cy.wait(500)
          cy.get('.blog-list').should('not.contain','a very interesting blog')
        })
        it('a blog created by another user cannot be deleted', function() {
          const user = {
            name: 'Trouble Maker',
            username: 'trouble',
            password: 'mischief'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user)
          cy.login({ username: 'trouble', password: 'mischief' })
          cy.contains('a very interesting blog').click()
          cy.url().should('include','/blogs')
          cy.should('not.contain','added by Trouble Maker')
            .and('not.contain','Remove blog entry')
        })
        it('the blogs are sorted by the number of likes', function() {
          cy.get('.blog-row').then(blogs => {
            cy.wrap(blogs[0]).should('contain','a very interesting blog')
            cy.wrap(blogs[1]).should('contain','another very interesting blog')
            cy.wrap(blogs[2]).should('contain','an awesome blog')
          })

        })
        describe('and some users exist', function (){
          beforeEach(function (){
            const user = {
              name: 'Another User',
              username: 'secondRow',
              password: 'fillerData'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.login({ username: 'secondRow', password: 'fillerData' })
            cy.createBlog({
              title: 'a very good blog',
              author: 'Good Guy',
              url: 'https:devto/goodguy.com',
              likes:18
            })
            cy.createBlog({
              title: 'another good blog',
              author: 'Smart Girl',
              url: 'https:devto/smartgirl,com',
              likes: 33
            })
          })
          it('a list of users can be seen with the number of blogs added', function (){
            cy.get('#top-nav').contains('Users').click()
            cy.url().should('include','/users')
            cy.get('tbody>tr').eq(0)
              .should('contain','Nivedita Rao')
              .and('contain','3')
            cy.get('tbody>tr').eq(1)
              .should('contain','Another User')
              .and('contain','2')
          })
          it('the blogs added by a particular user can be viewed', function () {
            cy.get('#top-nav').contains('Users').click()
            cy.get('#user-list').contains('Another User').click()
            cy.url().should('include','/users/')
            cy.contains('Blogs added by Another User')
            cy.get('#user-blogs')
              .should('contain','a very good blog')
              .and('contain','another good blog')
            cy.contains('a very good blog').click()
            cy.url().should('include','/blogs/')
            cy.contains('added by Another User')
          })
        })
      })
    })
  })

})