var infoSchemea = username => ({
  uid: '',
  age: '0',
  job: 'default Job',
  school: 'default_school',
  class: 'default_class',
  location: 'default_location',
  name: username,
  pic:
    'https://image.shutterstock.com/image-vector/man-icon-vector-600w-1040084344.jpg',
});

var defaultFriend = (uid, username, email) => ({
  uid: uid,
  username,
  email,
  friends: {
    jBgyLa8UECY73aDdoX6T78FYxwn1: {
      display_name: 'Tom',
      uid: 'jBgyLa8UECY73aDdoX6T78FYxwn1',
      profile_pic:
        'https://assets3.thrillist.com/v1/image/2767486/size/sk-2017_04_featured_listing_mobile.jpg',
    },
  },
  info: infoSchemea(username),
  msg: {},
});

export default defaultFriend;
