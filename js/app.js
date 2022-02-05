function navigate(hash) {
  switch (hash) {
    case '#home':
    case '#about':
    case '#close':
      document.querySelector('nav > a[href=\'#close\'] > i').classList.toggle('fa-times');
      document.querySelector('nav > a[href=\'#close\'] > i').classList.toggle('fa-bars');
      if (document.querySelector('nav > a[href=\'#close\'] > i').classList.contains('fa-bars')) {
        document.querySelector('nav').classList.add('inactive');
      } else {
        document.querySelector('nav').classList.remove('inactive');
      }
      break;
    default:
      break;
  }
}

const speakerList = [
  {
    name: 'Yochai Benkler',
    qualification: 'Berkman Professor of Entrepreneurial Legal Studies at Harvard Law School',
    description: 'Benkler Studies commons-based peer production, and published his seminal book The Wealth of Networks in 2006.',
    image: 'images/speakers/speaker1.png',
  },
  {
    name: 'Kilnam Chon',
    qualification: '',
    description: 'Kilnam Chon helped bring the Internet to Asia and is an outspoken advocate for the open web and digital commons. In 2012, he was inducted into the inaugrial class of Internet Society\'s (ISOC) Internet Hall of Fame',
    image: 'images/speakers/speaker2.png',
  },
  {
    name: 'SohYeong Noh',
    qualification: 'Director of Art Centre Nabi and a board member of CC Korea',
    description: 'As the main venue for new media art production in Korea. Nabi promotes cross-disciplinary collaboration and understanding among science technology. humanities, and the arts.',
    image: 'images/speakers/speaker3.png',
  },
  {
    name: 'Julia Leda',
    qualification: 'President of Young Pirates of Europe',
    description: 'European ingetration, political democracy and participation of youth through online as her major condern, Reda\'s report outlining potential changes to EU copyright law was approved by th eParliment in July.',
    image: 'images/speakers/speaker4.png',
  },
  {
    name: 'Lila Tretikov',
    qualification: 'Executive Director of the Wikimedia Foundation',
    description: 'Lila Tretikov is the Exective Director of the Wikimedia Foundation, the nonproft organization that operates Wikipedia. Wikipedia is free available in 290 languages and used by nearly half a billion people around the world every month.',
    image: 'images/speakers/speaker5.png',
  },
  {
    name: 'Ryan Merkley',
    qualification: 'CEO of Creative Commons, ex COO of the Mozilla Foundation',
    description: 'Ryan had been leading open-source projects at the Mozilla Foundation such as the open source movement.',
    image: 'images/speakers/speaker6.png',
  },
];

function speakerCardTemplate(speaker) {
  return `<div class="speaker-image">
      <img src="${speaker.image}" alt="Speaker Picture">
    </div>
    <div class="speaker-card-details">
      <h4>${speaker.name}</h4>
      <p class="speker-qualifications">${speaker.qualification}</p>
      <div class="underline-speakers"></div>
      <p class="speaker-desc">${speaker.description}</p>
    </div>`;
}

function removeButtonIfListFinished(lastLoaded) {
  if (lastLoaded >= speakerList.length) {
    document.querySelector('#load-more').classList.add('hidden');
  }
}

function loadMore(lastLoaded, speakersBox, totalToLoad) {
  for (let index = lastLoaded + 1; index <= lastLoaded + totalToLoad; index += 1) {
    // html string
    const htmlStr = speakerCardTemplate(speakerList[index]);
    const elem = document.createElement('div');
    elem.classList.add('speaker-card');
    elem.innerHTML = htmlStr;
    speakersBox.appendChild(elem);
  }

  lastLoaded += totalToLoad;

  removeButtonIfListFinished(lastLoaded + 1);
  return lastLoaded;
}

window.addEventListener('load', () => {
  let lastLoaded = -1;
  const speakersBox = document.querySelector('.featured-speakers');

  if (window.innerWidth >= 768) {
    const elem = document.querySelector('.inactive');
    if (elem != null) {
      elem.classList.remove('inactive');
    }

    const elem2 = document.querySelector('.Home');
    if (!elem2.classList.contains('hidden')) {
      elem2.classList += ' hidden';
    }
  } else {
    const elem2 = document.querySelector('.Home');
    elem2.classList.remove('hidden');
  }

  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    if (window.innerWidth >= 768) {
      lastLoaded = loadMore(lastLoaded, speakersBox, 6);
    } else {
      lastLoaded = loadMore(lastLoaded, speakersBox, 2);
    }

    document.querySelector('#load-more').addEventListener('click', () => {
      lastLoaded = loadMore(lastLoaded, speakersBox, 2);
    });
  }

  window.addEventListener('popstate', () => {
    navigate(window.location.hash);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    const elem = document.querySelector('.inactive');
    if (elem != null) {
      elem.classList.remove('inactive');
    }

    const elem2 = document.querySelector('.Home');
    if (!elem2.classList.contains('hidden')) {
      elem2.classList += ' hidden';
    }
  } else {
    const elem2 = document.querySelector('.Home');
    elem2.classList.remove('hidden');
  }
});