// A custom theme for this app

export const fbTheme = {
  primary: '#3b5998',
  secondary: '#2d4373',
  radius: '2px',
  hover: '#f50',
  logo:
    'https://www.freeiconspng.com/uploads/images-facebook-f-logo-png-transparent-background-page-2-29.png',
  social: {
    facebook: '#3b5998',
    twitter: '#1da1f2',
    google: '#db3236',
  },
  error: '#A40',
  background: '#fff',
  text: 'Arial, Helvetica, sans-serif',
  bg:
    'https://i1.wp.com/tdkom.com.br/wp-content/uploads/2017/03/bg-facebook.png?ssl=1',
};

export const twitterTheme = {
  primary: '#1da1f2',
  secondary: '#ffeeee',
  radius: '0px',
  hover: '#f50',
  logo:
    'https://www.freeiconspng.com/uploads/twitter-icon--flat-gradient-social-iconset--limav-2.png',
  social: {
    facebook: '#3b5998', // #2d4373
    twitter: '#1da1f2',
    google: '#db3236',
  },
  error: '#A40',
  background: '#fff',
  text: 'Georgia, serif',
  bg:
    'https://backgroundcheckall.com/wp-content/uploads/2017/12/basic-background.png',
};

function themeBg(props) {
  if (props.theme.bg) {
    return props.theme.bg;
  }
}

function themedText(props) {
  if (props.theme.text) {
    return props.theme.text;
  }
}

function themedColor(props) {
  if (props.theme.primary) {
    return props.theme.primary;
  }
}

function themedColorSecondary(props) {
  if (props.theme.secondary) {
    return props.theme.secondary;
  }
}

function themedRadius(props) {
  if (props.theme.radius) {
    return props.theme.radius;
  }
}

function themeLogo(props) {
  if (props.theme.logo) {
    return props.theme.logo;
  }
}
function themeHover(props) {
  if (props.theme.hover) {
    return props.theme.hover;
  }
}
export {
  themedText,
  themedColor,
  themedColorSecondary,
  themedRadius,
  themeLogo,
  themeBg,
  themeHover,
};
