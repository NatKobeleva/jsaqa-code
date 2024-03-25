Feature: Booking seats on the website

Scenario: User books one movie ticket
    Given the user is on the homepage
    When the user selects the day of the movie
    When the user selects movie time
    When the user selects one available seat
    When the user clicks the booking button
    Then the user should see the confirmation message "Получить код бронирования"

Scenario: User books two movie tickets
    Given the user is on the homepage
    When the user selects the day of the movie
    When the user selects movie time
    When the user selects the first available seat
    When the user selects the second available seat
    When the user clicks the booking button
    Then the user should see the confirmation message "Получить код бронирования"
