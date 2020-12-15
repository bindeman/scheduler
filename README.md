Will be visible as a popup: https://theglobalseal.com/schedulertest 

## Background:

#### Purpose:

This app is designed to help users navigate the five YouTube live streams that will be happening during the Global C.R.E.D. event. Each live event has at least one category it belongs to (Language Learners, Language Educators, etc). The goal of this app is to display the events scheduled for each category and offering users a way to access the live stream of the event that is live. It will also be used as an archive of past events once Global C.R.E.D. is over, offering a way to browse events and view the recorded videos of live events.

Adding events from API (will be deactivated on production): 

**Add new live event via POST request:**

URL:  `{app-url}/api/events/live/` with body:

`{
  "title": "Live Event from API Call",
  "presenter": "Phillip Bindeman",
  "organization": "Idaho Center for Language, Regional Monopoly of Languages and Locations",
  "duration":120,
  "date": "2020-11-04T21:58:49.585Z",
  "category": 3,
  "link": "http://theglobalseal.com/cred",
  "pastlink": "http://theglobalseal.com/pastlink",
  "description": "This event explores the ideas of intersectionality.",
  "bio": "International Education Consultant"
}`

* `date` is optional (leaving blank will set to current Date)

* `pastlink` is also optional

#### Categories (may be changed later):

`1` – Language Learners

`2` – Language Educators

`3` – Employers, Language Service Providers and H.R. Personnel

`4` – Administrators, Counselors, and College Recruiters

`5` – Language Learning Content and Assessment Providers

### Acceptance Criteria:

### Timing:

**Live Events:**

- Live Event timezones are displayed correctly in the user's timezone.

- Events are ordered Live, then Future, then Past depending on the date and duration. Live, future, and past have an appropriate header: `Events happening right now`, `Events in {x}` and `Events {x} ago`

- Events that have a link to the category live stream (i.e. in the `Language Learner` category, clicking `Watch Event` in an event modal of an event that is currently live will open a new tab to the category live stream.

- When new events are added through Compass or the API the event's timezone is saved correctly in UTC in the database and is converted correctly to the user's timezone when viewed it in the app.

 **Pre-Recorded**:

- Events are organized in alphabetical order.

- Start time of event is not displayed.

### Categories:

Each category displays only events that are in that category. `Language Learners` will only return events that have category `1`

- If an `Live Event` or `On-Demand` has multiple categories, both `1` and `2`, for example, it will display as an event both on `Language Learners` and `Language Educators`

#### Event Type: Live or Pre-Recorded:**

- If Live Events are selected, only `Live Events` for that category will be displayed (i.e. Live Language Learners Events)

- If Pre-Recorded is selected, only `Pre-Recorded` will appear for that category (i.e. Pre-Recorded Language Educators)

#### Modal:

- The correct start time, duration, presenter, organization, event, event description, and bio is displayed in the modal when clicking the event.

- **Past Event:** 
    - The modal header displays `Past event from {date}`

    - The `Watch Recording` button is disabled if the event doesn’t contain a `pastlink` and a tooltip appears with the text saying the event will be available soon on hover or tap on mobile.

    - The `Watch Recording` button is enabled if the event contains a `pastlink` and clicking the `Watch Recording` button opens a YouTube video in a new tab, NOT the recording of the live stream.

- **Live Event:**

    - The modal header displays a red `Live Badge` with information on how much time has passed since the event has passed.
    - The `Join Event` button is active and links to the link live stream.

- **Future Event:**

    * Modal header displays `Scheduled event in a {x}`

    * `Join Event` button is disabled, a tooltip appears with the same text as the Modal header on hover or tap on mobile.

- **Pre-Recorded Event:**

   * The header displays `On-demand event available in {x}` 

    * The current time is past availability date (`date` field in prerecrdedevents.js schema), 

    * The `Watch Event` button is enabled and opens a new tab on click the video.

    * The availability date is still in the future

    * The `Watch Event` button is disabled and a tooltip appears with the same text as the header on hover or tap on mobile.

#### Popup located in `/popup`:

* The popup resizes the height and width of the iFrame depending on the size of the window.

* Clicking on the header of the popup hides into a button.

* Clicking the button shows the popup.

#### Responsive Design:

- Width Definitions: 

    * Desktop: Greater than `720px width`

    * Tablet: `600px to 720px width`

    * Mobile less than `600px width`

* From mobile to desktop, the app resizes correctly: The side navigation bar switches between mobile, tablet, and desktop mode depending on the width of the window.

* The sidebar is hidden when the width is below 500px, a top menu bar appears with a hamburger to open and close the sidebar

* In mobile, the top app bar is hidden when scrolling down and reappears when scrolling up. The top app bar is not visible in other views than mobile.

* In tablet and mobile view, hovering or tapping on a sidebar menu item brings up a tooltip with the name of it.

* In mobile, tapping away from the menu, hides it.

* There are no unnecessary scrollbars.

#### Browser compatibility:

The app renders correctly in the following browsers:

- Edge 44

- Chrome 80+

- Safari 12+

- Firefox 40+