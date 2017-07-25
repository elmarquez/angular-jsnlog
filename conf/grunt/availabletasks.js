module.exports = {
  all: {
    options: {
      filter: 'exclude',
      tasks: []
    }
  },
  main: {
    options: {
      filter: 'include',
      tasks: ['availabletasks','compile','release','serve','test']
    }
  }
};
