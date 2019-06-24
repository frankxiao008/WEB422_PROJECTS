# `Team Management System` APP
### This application use Recat, React-bootsstrap, etc.
The following links may provide more information
Material  https://material-ui.com
evergreen https://evergreen.segment.com/
React select https://react-select.com/home 
Khan select  https://github.com/Khan/react-multi-select 
    
### install instruction
Run the following commands to install all the dependency and start the application
```bash
npm install
npm start                                 
```
## Component Structure


- `<Header>` - the navigation of the page.
- `<TeamCards>` - the body of the page, where the TeamCards reside in.
  - `<TeamCard>` -  a single TeamCard.
    - `<TeamName>` - the name of the Team for the current TeamCard.
    - `<SaveButton>` - syncs changes to Backend
    - `<MultiSelect>` - React select
        - Team Lead
        - Team Members
        - Projects

### `sro/teams.js`
The functions to get all the data from Team API.

### `src/components/TeamCard`
the Reac element for a single TeamCard.


