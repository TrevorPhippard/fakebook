import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../src/store';
import '../src/index.css';

import { fbTheme, twitterTheme } from './../src/ui/theme';

import {
  withKnobs,
  withKnobsOptions,
  text,
  number,
  boolean,
  color,
  select,
  radios,
  array,
  date,
  button,
  object,
  files,
} from '@storybook/addon-knobs';

import defaultFriend from '../src/containers/Login/defaultFriend';

/* components */

import Cover from '../src/components/Cover';
import Friends from '../src/components/Friends';
import Info from '../src/components/Info';
import Navbar from '../src/components/Navbar';
import Toolbar from '../src/components/Toolbar';
import Comment from '../src/components/Wall/Comment';
import Post from '../src/components/Wall/Post';

import SignUp from '../src/containers/Login/SignUp';
import SignIn from '../src/containers/Login/SignIn';
import Modal from '../src/containers/Modal';

/* wrappers */

import { withAuthentication } from '../src/containers/Sessions';

const providerCont = getStory => (
  <Provider store={store}>{getStory()}</Provider>
);
const browserCont = getStory => (
  <BrowserRouter>{getStory()}</BrowserRouter>
);

var imgMock =
  'https://image.shutterstock.com/image-photo/lost-thoughts-profile-pensive-young-260nw-1009247866.jpg';
/* theme selector */

const testThemes = {
  fbTheme,
  twitterTheme,
};

/*----------------------------------------------------------------------*/

// MOCK DATA

/*----------------------------------------------------------------------*/

let profile = {
  info: {
    name: 'Name',
    job: 'Job Title',
    pic: imgMock,
  },
};

let msg = {
  display_name: 'Name',
  createdAt: '0023',
  text: 'lorem ipsum',
  pic: imgMock,
  id: 'A0001',
};

const fakeFriend = {};

for (let i = 0; i < 9; i++) {
  fakeFriend['friend' + i] = {
    display_name: 'Friend ' + (i + 1),
    profile_pic: imgMock,
    uid: 'D2',
  };
}

/** ------------------------------------------------- *
     @desc stories
/* -------------------------------------------------- */

storiesOf('Main', module)
  .addDecorator(withKnobs)
  .addDecorator(providerCont)
  .addDecorator(browserCont)
  .add('Theme Options: Knobs', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);

    return (
      <ThemeProvider theme={chosenTheme}>
        <Fragment>
          <Toolbar />
          <Cover />
          <Navbar profile={profile} />
          <main>
            <aside>
              <Info profile={profile} />
              <Friends
                profile={profile}
                changeStateUser={() => console.log('click')}
              />
            </aside>
            <div>
              <Post />
              <Comment
                msg={msg}
                changeStateUser={payload =>
                  console.log('USER_SET', 'payload')
                }
              />
            </div>
          </main>
        </Fragment>
      </ThemeProvider>
    );
  });

storiesOf('Cover', module)
  .addDecorator(withKnobs)

  .add('Cover: Knobs', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);

    return (
      <ThemeProvider theme={chosenTheme}>
        <Cover />
      </ThemeProvider>
    );
  });

storiesOf('UserInfo', module)
  .addDecorator(withKnobs)
  .add('Info', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);

    return (
      <ThemeProvider theme={chosenTheme}>
        <Info profile={defaultFriend('uid', 'username', 'email')} />
      </ThemeProvider>
    );
  })
  .add('Friends', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);

    return (
      <ThemeProvider theme={chosenTheme}>
        <Friends
          profile={{ friends: fakeFriend }}
          changeStateUser={payload =>
            console.log('USER_SET', 'payload')
          }
        />
      </ThemeProvider>
    );
  });

storiesOf('Navbar', module)
  .addDecorator(withKnobs)

  .add('Navbar +Cover: Knobs', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);
    return (
      <ThemeProvider theme={chosenTheme}>
        <div>
          <Cover />
          <Navbar profile={profile} />
        </div>
      </ThemeProvider>
    );
  });

storiesOf('Toolbar', module)
  .addDecorator(withKnobs)
  .addDecorator(browserCont)
  .add('Toolbar: Knobs', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);

    return (
      <ThemeProvider theme={chosenTheme}>
        <div>
          <Toolbar />
        </div>
      </ThemeProvider>
    );
  });

storiesOf('Wall', module)
  .addDecorator(withKnobs)
  .addDecorator(providerCont)
  .addDecorator(browserCont)
  .add('Comment', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);

    return (
      <ThemeProvider theme={chosenTheme}>
        <div>
          <Comment
            msg={msg}
            changeStateUser={payload =>
              console.log('USER_SET', 'payload')
            }
          />
        </div>
      </ThemeProvider>
    );
  })
  .add('Post', () => {
    const chosenTheme = select('themes', testThemes, fbTheme);
    return (
      <ThemeProvider theme={chosenTheme}>
        <Post />
      </ThemeProvider>
    );
  });

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(browserCont)
  .add('test routing into modal', () => {
    const testComponents = { SignIn, SignUp };
    const chosenTheme = select('themes', testThemes, fbTheme);
    const modalChosen = select(
      'Modals',
      ['SignIn', 'SignUp'],
      'SignUp',
    );

    return (
      <div>
        <ThemeProvider theme={chosenTheme}>
          <Modal>
            <Route
              path="/:nowShowing"
              component={testComponents[modalChosen]}
            />
          </Modal>
        </ThemeProvider>
      </div>
    );
  });
