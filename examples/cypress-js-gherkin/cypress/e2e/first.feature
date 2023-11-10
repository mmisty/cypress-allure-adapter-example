@release1.1
@parentSuite("cypress-js-gherkin")
Feature: test cucumber
  Background:
    Given I visit site

  @P2
  Scenario: 01 visiting the frontpage
    Then I should see a search bar "hello"

  @P1
  @issue("ABC-1")
  Scenario: 02 test with issue
    Then I should see a search bar "hello"

  Scenario Outline: 03 test with examples
    Then I should see a search bar "<text>"
    Examples:
    | text  |
    | hello |
    | bye   |

  @P1
  @failOnPurpose
  Scenario: 04 failing test
    Then This step should fail

  @fail-after
  Scenario: 05 fail in after each
    Then I should see a search bar "das"

  @fail-before
  Scenario: 06 fail in before each
    Then I should see a search bar "das"