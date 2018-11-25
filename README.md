# ember-artisans

Utilize web workers in your production ember app.


## Installation

`npm install --save ember-artisans`

## Usage

### Creating a worker

Running the following command:

`ember g artisan <name>`

will install a worker into your project root at /workers

### Using worker in your app

You are able to either generate a pool of workers, or a single worker instance.

For interacting with a pool, there exists convenience tools located 


* Fork the repository
* `git clone <fork-repository-url>`
* `cd ember-artisans`
* `yarn`

## Running the development server

* `yarn start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test`

## Building

* `yarn build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### Deploying

* This application is deployed from a continuous integration (CI) workflow.  To deploy an update, submit a PR (with passing tests) 
  using a [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#forking-workflow); once the PR is merged the CI system will deploy the latest version of the application to the cloud hosting solution.
