@Test001
Feature: My Provisioning App

    Scenario: Login to My Provisioning App and update the list
        Given User Access My Provisioning App on a web browser
        Then User clicks on MyBI and select MyProvisioningCorporate
        Then User clicks on "Analyst"
    # When User click on "Period Year" drop down and selects "<Year>"
    # When User click on "Period Month" drop down and selects "<Month>"
    # When User click on "Country" drop down and selects "<Country>"

    # Uploading data

    Scenario: User Uploads the data for different countries with different year and month
        Then User selects "<Year>", "<Month>" and "<Country>" from each dropdown
        #    Then User will select Upload WlPCl and uploads the "<File>"
        #    Then click on "Submit All" button.

        Examples:
            | Year | Month | Country        | File      |
            | 2020 | 8     | Netherlands    | File208N  |
            | 2020 | 8     | United Kingdom | File208SA |

    # Approver of data

    # Scenario: Approve Menu
    #     Given User clicks on "Approver"
    #     # When User click on "Period Year" drop down and selects "<Year>"
    #     # When User click on "Period Month" drop down and selects "<Month>"
    #     # When User click on "Country" drop down and selects "<Country>"
    #     Then User selects "<Year>", "<Month>" and "<Country>" from each dropdown
    #     Then click on "Approve All" button.
    #     Then click on "Release All" button.

    #     Examples:
    #         | Year | Month | Country      | File      |
    #         | 2020 | 8     | Netherlands  | File208N  |
    #         | 2020 | 8     | South Africa | File208SA |

    Scenario: Close Opened Browser
        Then I Close Browser
