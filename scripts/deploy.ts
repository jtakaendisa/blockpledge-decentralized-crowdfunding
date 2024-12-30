const hre = require('hardhat');
const fs = require('fs');

function getRandomImages(arr: string[], numItems: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
}

function getRandomDate() {
  const currentDate = new Date();

  // Define the range in milliseconds (3 days to 2 months)
  const minDays = 3;
  const maxDays = 60;

  const minTime = minDays * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  const maxTime = maxDays * 24 * 60 * 60 * 1000; // 60 days in milliseconds

  // Generate a random timestamp between the range
  const randomTime = Math.random() * (maxTime - minTime) + minTime;

  // Add the random timestamp to the current date
  const randomDate = new Date(currentDate.getTime() + randomTime);

  // Format the date as 'YYYY-MM-DD'
  return randomDate.toISOString().split('T')[0];
}

const imageCategoryMap = {
  0: [
    'QmZ1qc1P475oYSXYPVDk5AcMqHAhgfQyuYj46w3i96EMAC',
    'QmWjKJMDF6hm7iH7fTBj32HehdrbJ435M7mVmQsvkBJDCt',
    'Qmd3A9weWnDmgEFCLNb9X83WHghRMBJhBoVpw9o7csdraq',
    'QmX5fA5rNTfHG2Vr9JPVbFivcMnAmeWVSbq262sbrpnr6U',
    'QmR9wjaA6gjMmYV7uFooJtxMEEbKAKVs92LBHRmbjLw9U6',
    'QmZhjqaNeNRD6GicJneSZX5CPFM9Dtj78EgNHiKrnKEeQJ',
    'QmfRuVMj2xPpGtQwqsb2B44h6thMdUu1eSw5WJxBnxrdwj',
    'QmSsP38GFW6KjTyU43iASVCDZCPJvapUsArUcPm59ErHAw',
    'QmS8GsMkcGPKziYFeKR5Zjhv4qRn1teh3BZ62gHWPiuvaU',
    'QmT8Xt5piJSkyvA35mRNTrxtKWEtkgHJw4EVoBaGpV3Ems',
  ],
  1: [
    'QmU3KJeRRgrJqK7qkfkNkv1n89awpep3Rq77hzzq9fv5Le',
    'QmbvAYrdieqDGmzQ8TUW8zXL8LroYMiwEJMFUmmDTdXhiG',
    'QmNhZ5eJ14j3ZMDavZf7P6XcxhrTzyJKp6F6L5YxRuNdjS',
    'QmaRSGUKbS312Mx7ExxyeyUSVEcGJ3r3rKWrZpSJT2UQaA',
    'QmRRg73VHJBek2fm1CiH7WnCwViCqX1wXWP4qpotjPMrux',
    'QmXFaCMRTFsSZcb3G1ZGtSTj6pfZJF6PrVKCTxUgceoFos',
    'QmdDE3Yoaf27S4TUHVTqJ8hUETHsWHYpdqQgobacgn4rvy',
    'QmSGxfbHcahfdB2Nwt3JrpoxtkQcpuHZ92BJj93b15MdRN',
    'QmTQFWpkSDMhJKMeUn5E4biNWU7GGhLE8ahGbw1BB9UcCC',
    'QmXQsEui78gqW8JUDsaZEWqSrtNPcNNtZdqetiCL6mzvBn',
  ],
  2: [
    'Qmf8jDqbuxzWuCWeek4wfEYYbCVBPsmwJfSbRk8mwbcKuJ',
    'QmaaTypVUg2NuW7YagyKrWuCXNBdqdSCG7YtdwAx8fguMq',
    'QmT64fNGoi3BLnxiWUJamiQc8nbLdNUkwKvSKhtY87ZmUW',
    'QmVNtVem6PUuEERNwsuHLiMtToxYfV7uNfQskgaftiAfaJ',
    'QmZgUZbPb2THvXGT2MerJu1rgoebdAcRN4gFxtmQHHH2TH',
    'Qmcz5vQ5ikWqBKhswUTA566SDh3wEvvMZ8okoufYnfVQa2',
    'Qma4NfMLNhDBD1hLHcXXhaEWakPxiEUErKwyDirThwE8oK',
    'QmTnYyMmbJpJxoYtN7Z9Po1x2R3qKiaRBi98UHbprpy5hd',
    'QmWPfDBU2kHji5qfmp4eozGXH2vypU9kwTRELbuWv3KsKQ',
    'QmRo5aFcP2AUSSUZUScX9Vfb5RJesq6ub9D5rJRHKabWh6',
  ],
  3: [
    'QmStuReGrGEtqEwz6mmMEdCjHv6FDiKdpNQL3shPMZV5Yo',
    'QmYaCV95rtrLYHkrMdzewa1gfSmcrDXW4KQc2a2LmqVXez',
    'QmXQmhyCxZE5cMTLJ1ESgPvboNTn6DSpDqaX4zCUUTgmw1',
    'QmZEtbnGtmHiZCNYjiwP3zmzJPk6UH9LipVba8GfsXpBuE',
    'QmckkpfKgN1KH4uma8QmSoNW3jzDzzyixcTx6AjHq4vzBS',
    'QmTDmMyGXyveE7qWJKWzVDRYbophdwx4895asvM9pVfad7',
    'QmYTs2QjnM8NPc2MKHhuiMheBUCBUa3BRDeuqm1y5RQV8H',
    'QmbimKPYArCKUMu858pfYXBv6zCCqEeWeoYsSxPb7DSeDD',
    'QmeVWuDRSTnzqefajBRLq18WeqDLDskYsQTwYy7r3HkXzt',
    'QmTECtaQGd5uNw9cqr5SZAWqPVgy1tWftjwdjWY6ed1ic3',
  ],
  4: [
    'QmYC9YP3qBp9Wp6ZMNCqHsty9pFPgbg98srHUGH4FAAgh2',
    'QmcWQcBj3JMQVtDzn8D7eearTLcGgqkTArqhfx4bSVRY8q',
    'Qme2pHyAPK9jE4J4P62JD3mnBPeH3oefbKybXodTG1rsLR',
    'QmZABjmKTAZGcpJB25Twg5asmT51XqjHK17xAURYHSyQfD',
    'QmUs4SBEhmcjToGueuRJhMKfTmBHp3V9hjqEcorpfizQDj',
    'QmfASHAx6ZgqLtR4Yzzck9eqKgz6eoYdzwDTcB1wwxsJpa',
    'QmYUHpSL5eaW6RZZzxnXvCtbWXpjfSif7wg5oFLNG7YqMh',
    'QmbNGTctN3zFiFm9a7hk4kwDkK84juhXCQ2erBefNWBYMw',
    'Qme5Pr74JzYj6SsMHwvkb4xLpLmvcuRi8cLQpeetp5wNPC',
    'QmaCbZHSbc2bCBocWNCYEAJr4p37ETqcFZxvPVqac5cLG2',
  ],
  5: [
    'QmS5r3BVTj5tYZJm5xxxzub6jBqnoY1cZEgQGDmJ2HZwxe',
    'QmQDxHnyQ72fucJrKHeMaEZkDRLpTQNf2JCzCET7WauLB3',
    'QmYdz8NLDWXzfGGa2GU2V8SKZQwyWJ6BUrJ1GUng8YdFW2',
    'QmfY9NYLhDKET8ZspRs8Bnc28uxxamRjKY5Vi49jbMquRd',
    'QmYFbizfm5cCyRg44sMLt16YE16Swrz28rXPMDG6z3JuRp',
    'QmXmMb7ztAUhUYtsswQpcJTB5bLfV2XGzGrQiQ9DaT6pEj',
    'QmaF1tpnZutTn1999QeriT9HuqGf1iRxSU74Je89D77hMH',
    'QmPUqWxRDz3X7uwpiLymYJgFLMpKpWevf9hUdfNWj9gpLn',
    'QmaQAir6bRqe6f25BQcKD2md7oPT2ExjjNyxHD5Gm4PznA',
    'QmYnVnQpZ6N43ShhfZPkBszA2iCS5xjuxrKBAxUyMVndh3',
  ],
  6: [
    'QmZY1uxv4tXzBcFpoPpwvLrd9Sg7MiqLzb3TDLzraJBVeP',
    'QmW946n77avsRP5W38nLdLkC21Xjbfp4g928qG4vF4WGQA',
    'QmPyuoBbw4eYBMNhceh4TcR3M9oTwV7BVknzydeMbJp8nS',
    'QmVJ4NTXGanfDA4w918KpJqBCtY6K6ZwY9D93eCx1PV74V',
    'QmaNqevMbxgwHccywA9UjLyskTTbGKNsmdPPHU9EXVRRqn',
    'QmRjWdboiRwfLvRRamxfyhpX3FHpfQnXwHvgfiLC22PL5C',
    'QmRqof7Ed9x1bd3C5areYgbRW8pfpBYgNsF3BaBfBZDy7Y',
    'QmP7uvhs6ogfVC1Xn3pXSrvqHAsLRJpNsaBsM5K4MdqPdA',
    'QmdfnovsEKf9NCKMXZZ471H3kZCqG18gLqrnhCMJoqemhe',
    'QmUwESX4gvd8oW3Vdph3bktXn6yqVsTd16RFmQtmxsxRgq',
  ],
  7: [
    'QmRrZe6Uoe93Rs8woM3T2NRLL5gWTFp3n2mbKdw7xUBGqV',
    'QmQMQHzUnuFBGWBAkdurX7SY4HJXW5TAtqZvBpbxR9sSn5',
    'QmSe56RyWhSQLQzVnpT8qu6ZSAZugChGGo6vzYvUXRGjtL',
    'QmWHLgA3Jwuj6mBzcVcQXMXzJYw1RdHEu4LP5JEUpStaKv',
    'QmaDbQfEbwVBzcqcpns9n2KTyQsXawqzM5aQgwRdZJP5V8',
    'QmQeDRs7DWEDQ7JUuonQ3H6E9vTU8PsvSQB5HHprBT2cwg',
    'QmQ88RRGg9qb5FBPyqr4gvYoeYvoz55pZKD5zVpSD3dbdg',
    'QmWy5d9snJcdKUwySRzrczFqJLccCEVVBbztzn3pz2qH9C',
    'QmcidErRYsg4oNq1jKw7awfDdeeJPyCZRWtM4Bo4JvyA7C',
    'QmWfVLRPtu8oppfjPkF77fNX1SwBrG9v25y2je3634vXBs',
  ],
  8: [
    'QmQHs3Tuce6vuE8cu3ZtY85PmZZ1VAMPAj8jrGQoELsAbo',
    'QmaSTVSwXXp6vB2e62VJzgk64AThyht6aNUPEnrATvrwgT',
    'QmSpSPtbq9NBmuLdocK1wWyeSoyFFvtJ2F6f99gaKkJqge',
    'QmXPXtbwWGmhv2wUqnmLtVDrVA5GLz8AZYAzkYn2K69Jox',
    'QmNsWwakeA7uHj8TJcVc72bA5Aypnhh2yirAkhBCUEH9bX',
    'QmbzzD6N1dEVMd7PEhDBf8nRSPj2mxPnoe5K4JSdJHhXUP',
    'QmUnxPGNf9hxkF5PqWTc71Wdt2kJqGTGiaSjxRpAmZtbEF',
    'QmUvkVFTbUwq9pssBHxCXuMqVBS87qetQ7JHC1tyAVLiqx',
    'QmXdzeg52HVqpWWd1PGRJRfdqJCUw4SXtTF2eu7jNRvFXa',
    'QmR3h2WpLVaTA5BxqFmcHQUNmUX7Zpst2UDMCVzF7nhrxz',
  ],
  9: [
    'QmaMxsH4ne4QE1QSZdTQQJQFFGW5eBhDyHCPRkM8mDPJz4',
    'QmYdE89JTKcqKvvAt76ysK8ukhtwBmJe7AhDYnDcfLHAew',
    'QmaJHSPZpVoYAS8xUQtkAs173SX7pLXbfDbvSiAnrFjNJQ',
    'QmSufEfTsdkEh3byacAszrFDhggY9hYp2Apa6Xtsf12iWC',
    'QmVgSa5gPuUY6emZ85r9GCfeG7tJkZQuwZD3RkRvDqAxwG',
    'QmdKyNmPrroyLwmfuEqCQxwSZpoJ46PwHZGGTTFhadqhfj',
    'QmReNzskG79X6FpcwaH2qUfYA6Zy7NrMzgDjWT2w5uGsFm',
    'QmXySQv4jHZ8Ab29qhyrpuaKwfqUjfrWKBaN4KnA9BkG5d',
    'QmfT7XQ7pZw6aDFKdxTUq4iGKr91tEUTzB1uo3xNNc4ekH',
    'QmX8ohWJupcEbGt7oi9pqoGeEmXmJhZx8YDHV2i1F3N5nk',
  ],
  10: [
    'QmXSnABh5MunEYk4V5igPjY88kZ33rp7g2Ewoni8va8ZWU',
    'QmUqFsgDAJBYrXeCCaaQqJWPMeFphbScQLHsyYQ9CfiHTz',
    'QmZiGFJZekFvXYZ5cewxZwzYfU4RpYjaYgmnftCcF9m4xm',
    'QmbSv24hGXWJ5mv4SrKzCnuMVQXS9nBVmXFNsLajywAgWY',
    'QmaFNukfqRnkGqUk9GyZdyNtMoLuMC8roovJATNByFrJSx',
    'QmPMBB4WsCTPgwphTRepreEPZdG5aK24Az9Dq5Udk5TAB9',
    'QmWLZbwMcT4vBVh1myPK81iLNSazNx1d61Bw8hU4KJ4Mfn',
    'QmQNRS3bmYt3M9oQtzazfyarWSZPVEC13RvNtwokULpFr6',
    'Qmb6q443HEBQQbcvGjF3ik7kepT8K7pWDYoZY8ut47Y3hx',
    'QmZxiMvzV4vYfhuzN2EwimWn496buHsg8EF63tZBq8H2Z7',
  ],
  11: [
    'QmNQXJ7RDGqfA17AH2oLPyQxLRssfHYyFu8efw1G388xEn',
    'QmRyvSEMZya2ihCm4K2LwmP6wNYLMvFSbULyTcTa5Wq1G8',
    'QmPa1cta4wcLs6a3MJcBwYEBJSKKUfzKybSB9ai9qMwzwJ',
    'QmRhpjodqorg9MBANC6GRc42654qFSzagT14veAinc7vwE',
    'QmYJvbVpYSSsFhSR2qmYCFN6shCW2VDEx4NRTkfKAGWAVu',
    'QmTavaWvkS4QprbGw8pjBxmfZ7HVKzTL6qUkdEonAi2KbJ',
    'QmRESQ2QUEtzUmmfTW9PirzpfJAZjgYqAy14qYnyd4zoB6',
    'QmYKXme46e5tQVMvkc1f8Cn3uZMPnX1pEMfUJDtYDxPUPp',
    'QmeEXGMN2hmEhVeXE7JNZVnWKfMuRszTuyGYFdMPFg56Vo',
    'Qmb4PULKAqndzahqC4drsh8pcMkJeFqQZnBgTvEo5W97D2',
  ],
};

const dummyProjects = [
  {
    title: 'Empowering Local Artists',
    description:
      'Support local artists in showcasing their talents and bringing their creative projects to life.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 100,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Innovative Tech Startup',
    description:
      'Back a cutting-edge technology startup revolutionizing the industry with its groundbreaking solutions.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Building Sustainable Communities',
    description:
      'Contribute to sustainable community projects aimed at improving living conditions and fostering social cohesion.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Fashion with Purpose',
    description:
      'Invest in eco-friendly fashion brands committed to ethical production practices and environmental conservation.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Food Revolution',
    description:
      'Support small-scale food producers and artisans in bringing their high-quality products to a wider audience.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 50,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Gaming Experience',
    description:
      'Back an innovative gaming project that promises to deliver immersive gameplay and unforgettable adventures.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Discover Hidden Gems',
    description:
      'Support local tourism initiatives that promote off-the-beaten-path destinations and authentic cultural experiences.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Empowering Education for All',
    description:
      'Invest in educational projects that provide equitable access to quality learning opportunities for learners of all ages.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Holistic Wellness Retreat',
    description:
      'Support wellness retreats that promote holistic healing and well-being through yoga, meditation, and healthy living practices.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'DIY Crafting Workshops',
    description:
      'Back DIY crafting workshops that empower individuals to unleash their creativity and learn new skills in a fun and supportive environment.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 70,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain Innovation Hub',
    description:
      'Invest in blockchain startups and projects driving innovation and disrupting traditional industries with decentralized technologies.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Animal Welfare Advocacy',
    description:
      'Support animal welfare organizations and initiatives dedicated to rescuing, rehabilitating, and rehoming animals in need.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 40,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Revolution',
    description:
      'Back renewable energy projects aimed at accelerating the transition to clean and sustainable energy sources.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Revolutionizing Healthcare',
    description:
      'Invest in groundbreaking healthcare innovations that improve patient outcomes and enhance quality of life.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Empowering Rural Communities',
    description:
      'Support initiatives empowering rural communities through access to education, healthcare, and economic opportunities.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Collective',
    description:
      'Back sustainable fashion collectives committed to ethical production, fair trade practices, and environmental stewardship.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 100,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farming Initiative',
    description:
      'Support urban farming initiatives transforming vacant lots and rooftops into productive urban farms to address food insecurity.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Experience',
    description:
      'Back virtual reality gaming projects offering immersive gameplay experiences and pushing the boundaries of VR technology.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Culinary Adventure Tours',
    description:
      'Invest in culinary adventure tours showcasing diverse cuisines, local flavors, and culinary traditions from around the world.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Digital Learning Platforms',
    description:
      'Support digital learning platforms providing accessible and affordable education to learners worldwide, regardless of geographic location.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mindfulness Retreats',
    description:
      'Back mindfulness retreats offering meditation, yoga, and wellness practices to promote mental clarity, emotional balance, and inner peace.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Handcrafted Goods',
    description:
      'Invest in artisanal handcrafted goods made with passion and skill, preserving traditional craftsmanship and cultural heritage.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 70,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Decentralized Finance Projects',
    description:
      'Support decentralized finance (DeFi) projects revolutionizing traditional finance systems through blockchain technology and smart contracts.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Initiatives',
    description:
      'Back wildlife conservation initiatives protecting endangered species, preserving habitats, and promoting biodiversity conservation.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 90,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Innovative Art Installation',
    description:
      'Support the creation of an innovative art installation that challenges perceptions and sparks meaningful conversations.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Cutting-Edge Tech Startup',
    description:
      'Invest in a cutting-edge tech startup developing groundbreaking solutions to address real-world challenges and disrupt industries.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Expansion',
    description:
      'Support the expansion of a community garden initiative providing fresh produce, educational programs, and green spaces to urban neighborhoods.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 100,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Collective',
    description:
      'Back an ethical fashion collective committed to sustainable practices, fair wages, and transparent supply chains in the fashion industry.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Food Innovation Hub',
    description:
      'Invest in a food innovation hub fostering collaboration, research, and development of sustainable food technologies and alternative protein sources.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Virtual Reality Experience',
    description:
      'Back an immersive virtual reality experience that transports users to fantastical worlds, immersive narratives, and interactive adventures.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Cultural Heritage Preservation',
    description:
      'Support initiatives dedicated to preserving cultural heritage sites, artifacts, and traditions for future generations to appreciate and learn from.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Learning Platform Expansion',
    description:
      'Invest in the expansion of an online learning platform providing accessible education and skill development opportunities to learners worldwide.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wellness Retreat Center',
    description:
      'Back the development of a wellness retreat center offering holistic healing, mindfulness practices, and rejuvenating experiences in a serene natural setting.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisan Crafts Collective',
    description:
      'Invest in an artisan crafts collective showcasing traditional craftsmanship, unique designs, and handmade creations crafted with passion and skill.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Financial Inclusion',
    description:
      'Support blockchain-based financial inclusion initiatives providing access to banking, loans, and financial services to underserved communities globally.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 170,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Rehabilitation Center',
    description:
      'Back the establishment of a wildlife rehabilitation center dedicated to rescuing, rehabilitating, and releasing injured and orphaned wildlife.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Public Art Installation',
    description:
      'Contribute to the creation of an interactive public art installation that engages communities, fosters connections, and celebrates diversity.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Powered Supply Chain Solution',
    description:
      'Invest in a blockchain-powered supply chain solution that enhances transparency, traceability, and sustainability in global supply chains.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Youth Empowerment Program Expansion',
    description:
      'Support the expansion of a youth empowerment program providing mentorship, skills training, and leadership development opportunities to young people.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Collective',
    description:
      'Back a sustainable fashion collective dedicated to eco-friendly practices, ethical production, and promoting a circular economy in the fashion industry.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farming Initiative',
    description:
      'Invest in an urban farming initiative transforming vacant lots into vibrant urban farms, producing fresh, locally grown produce for urban communities.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Storytelling Experience',
    description:
      'Support the creation of an immersive storytelling experience that combines technology, art, and narrative to transport audiences to new worlds and perspectives.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Historic Site Restoration Project',
    description:
      'Back a historic site restoration project aimed at preserving cultural heritage, reviving historical landmarks, and promoting heritage tourism.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Coding Bootcamp Expansion',
    description:
      'Invest in the expansion of an online coding bootcamp providing accessible coding education, job placement support, and career advancement opportunities.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Holistic Wellness Resort',
    description:
      'Back the development of a holistic wellness resort offering healing therapies, wellness retreats, and transformative experiences in a tranquil natural setting.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Jewelry Collective',
    description:
      'Invest in an artisanal jewelry collective showcasing handcrafted jewelry designs, traditional craftsmanship, and ethically sourced materials.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain for Social Impact',
    description:
      'Support blockchain for social impact initiatives leveraging distributed ledger technology to address social, environmental, and humanitarian challenges.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 170,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Marine Conservation Project',
    description:
      'Back a marine conservation project focused on protecting marine ecosystems, conserving marine species, and promoting sustainable ocean management.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Mural Project',
    description:
      'Support the creation of a community mural project that brings together local artists, residents, and stakeholders to beautify public spaces and foster civic pride.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Healthcare Platform',
    description:
      'Invest in an AI-powered healthcare platform revolutionizing healthcare delivery, patient care management, and medical diagnostics through advanced technology.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Green Spaces Initiative',
    description:
      'Back a green spaces initiative dedicated to creating and maintaining urban green spaces, parks, and gardens to enhance urban livability and environmental sustainability.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Label',
    description:
      'Support an ethical fashion label committed to fair labor practices, sustainable sourcing, and eco-friendly production methods in the fashion industry.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Kitchen Expansion',
    description:
      'Invest in the expansion of a community kitchen providing nutritious meals, food assistance, and culinary training programs to individuals and families in need.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Experience',
    description:
      'Back the development of a virtual reality gaming experience that offers immersive gameplay, interactive storytelling, and cutting-edge virtual worlds for gamers.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Preservation of Cultural Heritage',
    description:
      'Support the preservation of cultural heritage sites, artifacts, and traditions to safeguard cultural identity, promote cultural diversity, and preserve historical legacies.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Language Learning Platform',
    description:
      'Invest in an online language learning platform offering language courses, interactive lessons, and language proficiency assessments for learners worldwide.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wellness Retreat Center',
    description:
      'Back the development of a wellness retreat center offering holistic wellness programs, yoga retreats, and mindfulness workshops in a serene natural setting.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Ceramic Studio',
    description:
      'Support an artisanal ceramic studio creating handcrafted ceramic pottery, ceramics workshops, and artistic collaborations with local artisans.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Voting System',
    description:
      'Invest in a blockchain-based voting system enabling secure, transparent, and tamper-proof voting processes for elections, referendums, and governance.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Initiative',
    description:
      'Back a wildlife conservation initiative focused on protecting endangered species, preserving natural habitats, and combating wildlife trafficking.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Public Art Installation',
    description:
      'Support the creation of a large-scale public art installation that celebrates cultural diversity, fosters community engagement, and enhances urban landscapes.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Powered Supply Chain',
    description:
      'Invest in a blockchain-powered supply chain solution optimizing transparency, traceability, and efficiency in global supply chain management and logistics.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Youth Empowerment Program',
    description:
      'Back a youth empowerment program providing mentorship, leadership development, and educational opportunities for at-risk youth to unlock their full potential.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Label',
    description:
      'Support a sustainable fashion label committed to eco-friendly materials, ethical production practices, and fair trade partnerships in the fashion industry.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farming Initiative',
    description:
      'Invest in an urban farming initiative promoting urban agriculture, local food production, and food security through rooftop gardens, community farms, and hydroponic systems.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Virtual Reality Experience',
    description:
      'Back the development of an immersive virtual reality experience offering virtual tours, interactive simulations, and educational content for immersive learning.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Historical Preservation Project',
    description:
      'Support a historical preservation project dedicated to conserving and restoring historical landmarks, buildings, and cultural heritage sites for future generations.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Tutoring Platform',
    description:
      'Invest in an online tutoring platform providing personalized tutoring sessions, homework help, and academic support for students of all ages and subjects.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mindfulness Retreat Center',
    description:
      'Back the establishment of a mindfulness retreat center offering meditation retreats, wellness workshops, and mindfulness-based stress reduction programs.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Woodworking Studio',
    description:
      'Support an artisanal woodworking studio crafting handmade wooden furniture, home decor items, and custom woodworking projects using sustainable wood materials.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Startup',
    description:
      'Invest in a renewable energy startup developing innovative solar, wind, and hydroelectric power solutions to accelerate the transition to clean and sustainable energy sources.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Animal Shelter Expansion',
    description:
      'Support the expansion of an animal shelter facility to provide shelter, care, and adoption services for stray and abandoned animals in need of loving homes.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artificial Intelligence Research',
    description:
      'Back a research project focused on advancing artificial intelligence technologies for applications in healthcare, finance, robotics, and natural language processing.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mobile Health App Development',
    description:
      'Invest in the development of a mobile health app offering personalized health tracking, remote patient monitoring, and telemedicine services for improving health outcomes.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Project',
    description:
      'Support a community garden project promoting urban agriculture, food sustainability, and community engagement through shared gardening spaces and educational workshops.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Studio',
    description:
      'Back a virtual reality gaming studio creating immersive VR games, experiences, and simulations for gaming enthusiasts and virtual reality enthusiasts.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Cultural Exchange Program',
    description:
      'Invest in a cultural exchange program fostering cross-cultural understanding, intercultural dialogue, and global citizenship through international exchange opportunities.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Collection',
    description:
      'Support the launch of a sustainable fashion collection featuring eco-friendly clothing, accessories, and lifestyle products made from recycled materials and organic fabrics.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Learning Platform',
    description:
      'Back an online learning platform providing interactive courses, tutorials, and educational resources covering a wide range of topics and disciplines for lifelong learners.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Initiative',
    description:
      'Invest in a wildlife conservation initiative dedicated to protecting endangered species, conserving natural habitats, and combating illegal wildlife trafficking.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Space Exploration VR Experience',
    description:
      'Back the development of a groundbreaking virtual reality experience that allows users to explore distant planets, moons, and galaxies, providing an immersive journey through the cosmos.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ocean Cleanup Drone Fleet',
    description:
      'Support the deployment of an autonomous drone fleet designed to remove plastic pollution and debris from oceans worldwide, contributing to marine conservation efforts and protecting marine ecosystems.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Assistant',
    description:
      'Invest in the development of an artificial intelligence-powered personal assistant that helps users manage their daily tasks, schedule appointments, organize meetings, and streamline productivity.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Vertical Farming Initiative',
    description:
      'Back a vertical farming initiative that utilizes innovative agricultural technologies to grow fresh produce in urban environments, reducing food miles, conserving water, and promoting sustainable agriculture.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Art Installation',
    description:
      'Support the creation of a large-scale art installation powered by renewable energy sources such as solar panels and wind turbines, showcasing the beauty and potential of clean energy solutions.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Voting System',
    description:
      'Back the development of a secure and transparent blockchain-based voting system that ensures the integrity and fairness of elections, enabling secure and verifiable voting processes.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community-Owned Renewable Energy Project',
    description:
      'Invest in a community-owned renewable energy project that enables local communities to collectively own and benefit from renewable energy infrastructure, fostering energy independence and sustainability.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Healthcare Diagnosis Platform',
    description:
      'Support the development of an AI-powered healthcare diagnosis platform that uses machine learning algorithms to analyze medical data and assist healthcare professionals in accurate diagnosis and treatment planning.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Music Production Studio for Underserved Youth',
    description:
      'Back the establishment of a music production studio dedicated to providing free access to recording equipment, musical instruments, and mentorship programs for underserved youth, empowering them through music creation.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Art Installation for Public Spaces',
    description:
      'Support the creation of an interactive art installation designed for public spaces, engaging audiences through immersive experiences, visual storytelling, and interactive technology, enriching urban environments with artistic expression.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Art Installation',
    description:
      'Support the creation of a large-scale art installation powered by renewable energy sources such as solar panels and wind turbines, showcasing the beauty and potential of clean energy solutions.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Assistant',
    description:
      'Invest in the development of an artificial intelligence-powered personal assistant that helps users manage their daily tasks, schedule appointments, organize meetings, and streamline productivity.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ocean Cleanup Drone Fleet',
    description:
      'Support the deployment of an autonomous drone fleet designed to remove plastic pollution and debris from oceans worldwide, contributing to marine conservation efforts and protecting marine ecosystems.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community-Owned Renewable Energy Project',
    description:
      'Invest in a community-owned renewable energy project that enables local communities to collectively own and benefit from renewable energy infrastructure, fostering energy independence and sustainability.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Food Waste Reduction App',
    description:
      'Back the development of a mobile application that helps users reduce food waste by providing recipes based on available ingredients, meal planning tools, and expiration date reminders.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Music Production Studio for Underserved Youth',
    description:
      'Back the establishment of a music production studio dedicated to providing free access to recording equipment, musical instruments, and mentorship programs for underserved youth, empowering them through music creation.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Voting System',
    description:
      'Back the development of a secure and transparent blockchain-based voting system that ensures the integrity and fairness of elections, enabling secure and verifiable voting processes.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Healthcare Diagnosis Platform',
    description:
      'Support the development of an AI-powered healthcare diagnosis platform that uses machine learning algorithms to analyze medical data and assist healthcare professionals in accurate diagnosis and treatment planning.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Vertical Farming Initiative',
    description:
      'Back a vertical farming initiative that utilizes innovative agricultural technologies to grow fresh produce in urban environments, reducing food miles, conserving water, and promoting sustainable agriculture.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Finance & Investment Education Platform',
    description:
      'Support the development of an online platform that provides comprehensive financial education resources, investment tutorials, and personal finance management tools to empower individuals with financial literacy.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Trainer App',
    description:
      'Back the development of a mobile application that utilizes artificial intelligence to create personalized workout plans, track fitness progress, and provide real-time coaching and motivation to users.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 240,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Pet Adoption & Rescue Network',
    description:
      'Support the creation of an online platform that connects pet lovers with shelters, rescue organizations, and adoptable pets, facilitating pet adoption, fostering, and community support for animal welfare.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Art Installation',
    description:
      'Support the creation of an interactive art installation that engages viewers through immersive experiences, combining visual, auditory, and tactile elements to evoke emotions and spark creativity.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Supply Chain Transparency Platform',
    description:
      'Back the development of a blockchain-based platform that enhances supply chain transparency and traceability, allowing consumers to verify the authenticity, origin, and ethical practices of products.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Expansion Project',
    description:
      'Support the expansion of a community garden initiative that provides accessible green spaces for urban residents, promotes urban agriculture, and fosters community engagement through gardening activities.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Design Workshop',
    description:
      'Back a sustainable fashion design workshop that educates aspiring designers on eco-friendly practices, ethical sourcing, and circular fashion principles, fostering a more sustainable future for the fashion industry.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Zero-Waste Grocery Store Initiative',
    description:
      'Support the establishment of a zero-waste grocery store that offers package-free and bulk food options, encourages reusable packaging, and promotes waste reduction and sustainable consumption habits.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Experience',
    description:
      'Back the development of a virtual reality gaming experience that transports players to immersive worlds, offering engaging storytelling, interactive gameplay, and social multiplayer interactions.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ecotourism Adventure Expedition',
    description:
      'Support an ecotourism adventure expedition that explores remote and biodiverse locations, immersing travelers in nature while promoting environmental conservation, cultural exchange, and sustainable travel practices.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 350,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Learning Platform for Healthcare Professionals',
    description:
      'Back the development of an online learning platform tailored for healthcare professionals, offering continuing education courses, medical simulations, and certification programs to enhance clinical skills and knowledge.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Fitness Park Construction',
    description:
      'Support the construction of an urban fitness park equipped with outdoor gym equipment, jogging tracks, and recreational facilities, providing free fitness opportunities for city residents to promote active and healthy lifestyles.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Financial Literacy Workshops for Low-Income Families',
    description:
      'Back a series of financial literacy workshops aimed at empowering low-income families with money management skills, budgeting strategies, and resources to build financial stability and achieve economic independence.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Investment Advisory Platform',
    description:
      'Support the development of an AI-powered investment advisory platform that analyzes market trends, evaluates investment opportunities, and provides personalized recommendations to help users make informed investment decisions.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Animal Sanctuary Expansion Project',
    description:
      'Back the expansion of an animal sanctuary dedicated to rescuing and providing lifelong care for abused, abandoned, and neglected animals, offering rehabilitation programs and educational experiences for visitors.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Digital Art NFT Exhibition',
    description:
      'Support the creation of a digital art NFT exhibition showcasing innovative digital artworks by emerging artists, leveraging blockchain technology to enable secure ownership and trading of digital assets.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Smart Home Automation System',
    description:
      'Back the development of a smart home automation system that integrates IoT devices, AI algorithms, and voice recognition technology to streamline household tasks, enhance security, and improve energy efficiency.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Recycling Program',
    description:
      'Support a community recycling program aimed at raising awareness about environmental conservation, reducing waste, and promoting responsible recycling practices through education, outreach, and infrastructure improvements.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Label Launch',
    description:
      'Back the launch of an ethical fashion label committed to sustainability, fair labor practices, and transparency in the fashion supply chain, offering stylish and eco-friendly clothing options for conscious consumers.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Agriculture Initiative',
    description:
      'Support an urban agriculture initiative that transforms vacant lots and rooftops into productive urban farms, providing fresh produce to local communities, promoting food security, and fostering green urban spaces.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Virtual Reality Concert Experience',
    description:
      'Back the development of an immersive virtual reality concert experience that allows music fans to enjoy live performances from their favorite artists in a virtual venue, offering an interactive and lifelike concert experience.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Eco-Tourism Resort',
    description:
      'Support the development of a sustainable eco-tourism resort that promotes responsible tourism, preserves natural ecosystems, and supports local communities, offering eco-friendly accommodations and immersive nature experiences.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 350,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Medical Education Platform',
    description:
      'Back the creation of an online medical education platform offering high-quality medical courses, virtual simulations, and clinical training modules for healthcare professionals, students, and lifelong learners.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Outdoor Fitness Trail Installation',
    description:
      'Support the installation of an outdoor fitness trail equipped with exercise stations, fitness equipment, and jogging paths, providing a free and accessible outdoor fitness facility for the community to enjoy.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Financial Literacy Program for Youth',
    description:
      'Back a financial literacy program designed for youth, providing interactive workshops, educational resources, and mentorship opportunities to empower young people with essential money management skills and financial knowledge.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 170,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Finance Assistant',
    description:
      'Support the development of an AI-powered personal finance assistant that offers personalized financial advice, budgeting tools, and investment recommendations to help individuals achieve their financial goals and build wealth.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Project',
    description:
      'Back a wildlife conservation project focused on protecting endangered species, preserving natural habitats, and promoting biodiversity conservation through research, community engagement, and conservation initiatives.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Dreamscape: Immersive Art Experience',
    description:
      'Step into the dream world with Dreamscape, an immersive art experience that combines augmented reality, interactive installations, and surreal landscapes to stimulate the senses and ignite the imagination.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Galactic Explorer: Space Exploration Game',
    description:
      'Embark on an epic space exploration journey with Galactic Explorer, a groundbreaking video game that lets players pilot spacecraft, discover alien worlds, and unravel the mysteries of the cosmos.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Eco-Friendly Fashion Show Extravaganza',
    description:
      'Witness the future of fashion at the Eco-Friendly Fashion Show Extravaganza, a star-studded event showcasing sustainable fashion designs, eco-friendly materials, and innovative recycling techniques.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Robo Revolution: AI Robotics Competition',
    description:
      'Join the Robo Revolution and support the next generation of AI robotics engineers as they compete in a high-stakes competition to build autonomous robots capable of tackling real-world challenges.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ocean Odyssey: Underwater Adventure Documentary',
    description:
      'Dive into the depths of the ocean with Ocean Odyssey, an awe-inspiring documentary that takes viewers on a journey to explore coral reefs, underwater caves, and the fascinating creatures that inhabit the sea.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 350,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Future Fusion: Culinary Innovation Lab',
    description:
      'Experience the future of food at Future Fusion, a culinary innovation lab where chefs experiment with cutting-edge techniques, molecular gastronomy, and sustainable ingredients to create mind-blowing gastronomic delights.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mind Matters: Mental Wellness Retreat',
    description:
      'Take a journey inward with Mind Matters, a transformative mental wellness retreat that offers mindfulness workshops, meditation sessions, and holistic therapies to nurture inner peace and emotional well-being.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Tech Titans: Startup Accelerator Program',
    description:
      'Empower the next generation of tech titans with Tech Titans, a startup accelerator program that provides funding, mentorship, and resources to visionary entrepreneurs building the technology of tomorrow.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Whisk & Wander: Culinary Adventure Tours',
    description:
      'Embark on a gastronomic journey with Whisk & Wander, a series of culinary adventure tours that take food enthusiasts on a mouthwatering exploration of local cuisines, hidden gems, and cultural delights.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Code Crusaders: Girls in Tech Coding Camp',
    description:
      'Empower girls to become future code crusaders with Code Crusaders, a coding camp designed to inspire, educate, and mentor young women in STEM fields, computer science, and technology.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 190,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Warriors: Conservation Expedition',
    description:
      'Join the ranks of wildlife warriors and embark on a conservation expedition to protect endangered species, restore natural habitats, and safeguard biodiversity in remote wilderness areas.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Arts Alive: Community Mural Project',
    description:
      'Bring communities together with Arts Alive, a community mural project that transforms public spaces into vibrant works of art, celebrates local culture, and fosters civic pride through collaborative art-making.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Art Therapy Program for Veterans',
    description:
      'Support an art therapy program tailored for veterans, providing them with a creative outlet to express emotions, cope with trauma, and promote mental well-being through therapeutic art-making sessions.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'STEM Scholarships for Underprivileged Students',
    description:
      'Back STEM scholarships for underprivileged students, enabling them to pursue higher education and careers in science, technology, engineering, and mathematics, bridging the opportunity gap and fostering diversity in STEM fields.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Revitalization',
    description:
      'Fund the revitalization of a community garden, transforming it into a vibrant green space for urban agriculture, community gatherings, educational workshops, and environmental stewardship initiatives.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Marketplace',
    description:
      'Support an ethical fashion marketplace that connects consumers with sustainable and eco-friendly fashion brands, promoting transparency, fair trade practices, and environmental conservation in the fashion industry.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 240,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Kitchen Renovation',
    description:
      'Help renovate a community kitchen to create a welcoming space for cooking classes, food distribution programs, and community meals, addressing food insecurity and promoting healthy eating habits in underserved neighborhoods.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 290,
    expiresAt: getRandomDate(),
  },
  {
    title: 'STEM Coding Club for Girls',
    description:
      'Back a STEM coding club designed for girls, providing them with coding skills, mentorship, and opportunities to explore careers in technology, empowering them to become future leaders and innovators in the tech industry.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Outdoor Fitness Park',
    description:
      'Support the creation of an outdoor fitness park equipped with exercise stations, walking trails, and recreational amenities, promoting physical activity, health, and social interaction in the community.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 210,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wellness Retreat for Caregivers',
    description:
      'Fund a wellness retreat tailored for caregivers, offering respite, relaxation, and self-care activities to recharge and rejuvenate those who provide care for loved ones with illnesses or disabilities.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'DIY Home Decor Workshop',
    description:
      'Back a DIY home decor workshop that teaches participants how to create personalized home decor items using sustainable materials and eco-friendly techniques, inspiring creativity and environmental consciousness.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 240,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Social Impact Investment Fund',
    description:
      'Invest in a social impact investment fund that channels capital into socially responsible ventures addressing pressing global challenges, such as poverty alleviation, environmental conservation, and access to healthcare and education.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Project',
    description:
      'Support a wildlife conservation project focused on protecting endangered species, preserving habitats, and promoting biodiversity conservation through scientific research, community engagement, and habitat restoration efforts.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Art Installation',
    description:
      'Create an interactive art installation that engages viewers through immersive experiences, multimedia elements, and interactive technology, fostering creativity, exploration, and community interaction.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Coding Bootcamp Scholarships',
    description:
      'Provide scholarships for individuals from underrepresented backgrounds to attend a coding bootcamp, empowering them with in-demand coding skills and opportunities for career advancement in the tech industry.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Greening Initiative',
    description:
      'Support an urban greening initiative aimed at creating green spaces, planting trees, and implementing sustainable landscaping practices in urban areas, improving air quality, enhancing biodiversity, and beautifying neighborhoods.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Eco-Friendly Fashion Line',
    description:
      'Launch an eco-friendly fashion line that prioritizes sustainable materials, ethical manufacturing processes, and fair labor practices, offering stylish and environmentally conscious clothing options to conscientious consumers.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Food Co-op',
    description:
      'Establish a community-owned food co-op that provides access to fresh, locally sourced produce, bulk goods, and healthy food options at affordable prices, fostering food security, sustainability, and community resilience.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Education Platform',
    description:
      'Develop a virtual reality education platform that offers immersive learning experiences across various subjects, enabling students to explore virtual environments, interact with educational content, and enhance their understanding of complex concepts.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 230,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Outdoor Adventure Playground',
    description:
      'Construct an outdoor adventure playground equipped with climbing structures, zip lines, and obstacle courses, providing children with opportunities for active play, exploration, and imaginative outdoor adventures.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mental Health Awareness Campaign',
    description:
      'Launch a mental health awareness campaign that promotes destigmatization, raises awareness about mental health issues, and provides resources, support, and education to individuals and communities.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'DIY Sustainable Living Workshops',
    description:
      'Organize DIY sustainable living workshops that teach participants how to reduce waste, conserve energy, and adopt eco-friendly practices in their daily lives, promoting environmental stewardship and sustainable living.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 260,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Social Impact Investing Platform',
    description:
      'Develop a social impact investing platform that connects investors with socially responsible investment opportunities, enabling them to align their financial goals with positive social and environmental outcomes.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Habitat Restoration Project',
    description:
      'Support a wildlife habitat restoration project focused on restoring degraded habitats, reintroducing native species, and enhancing biodiversity conservation efforts in ecologically sensitive areas.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Mural Project',
    description:
      'Engage local artists and community members in creating a vibrant mural that celebrates cultural diversity, promotes unity, and revitalizes public spaces, fostering community pride and engagement.',
    imageURLs: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Clean Energy Microgrid Installation',
    description:
      'Install a clean energy microgrid system to power community buildings, homes, and businesses with renewable energy sources like solar and wind, reducing carbon emissions and increasing energy resilience.',
    imageURLs: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Youth Empowerment Center Expansion',
    description:
      'Expand a youth empowerment center to offer more educational programs, vocational training, and mentorship opportunities for underserved youth, empowering them to succeed academically and professionally.',
    imageURLs: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Design Competition',
    description:
      'Organize a sustainable fashion design competition to showcase eco-friendly fashion designs, innovative materials, and circular fashion concepts, promoting sustainable fashion practices and raising awareness.',
    imageURLs: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farm-to-Table Restaurant',
    description:
      'Establish an urban farm-to-table restaurant that sources fresh produce from local urban farms and promotes sustainable agriculture, healthy eating, and community connections through farm-to-table dining experiences.',
    imageURLs: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 290,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Art Gallery',
    description:
      'Create a virtual reality art gallery that showcases digital artworks, immersive installations, and interactive exhibits, providing artists with a platform to exhibit their work and audiences with unique art experiences.',
    imageURLs: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ecotourism Lodge Development',
    description:
      'Develop an ecotourism lodge in a natural reserve or eco-friendly destination, offering sustainable accommodations, nature-based activities, and educational experiences to promote eco-tourism and conservation.',
    imageURLs: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mental Health Awareness Campaign',
    description:
      'Launch a mental health awareness campaign to reduce stigma, raise awareness about mental health issues, and provide resources and support for individuals struggling with mental health challenges.',
    imageURLs: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 340,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Zero-Waste Lifestyle Workshops',
    description:
      'Organize zero-waste lifestyle workshops and events to educate individuals and communities about waste reduction, recycling, composting, and sustainable living practices, inspiring people to adopt a zero-waste lifestyle.',
    imageURLs: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Green Roof Installation',
    description:
      'Install green roofs on public buildings, commercial properties, and residential homes to reduce urban heat island effect, improve air quality, and enhance energy efficiency through natural insulation and stormwater management.',
    imageURLs: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Social Impact Investing Summit',
    description:
      'Host a social impact investing summit to convene investors, philanthropists, and social entrepreneurs, facilitating discussions, networking, and collaboration opportunities to drive positive social and environmental change.',
    imageURLs: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Marine Conservation Awareness Campaign',
    description:
      'Launch a marine conservation awareness campaign to educate the public about ocean conservation, marine biodiversity, and the importance of protecting marine ecosystems, inspiring action and advocacy for ocean conservation.',
    imageURLs: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 320,
    expiresAt: getRandomDate(),
  },
];

async function main() {
  const taxFee = 5;
  const contract = await hre.ethers.deployContract('BlockPledge', [taxFee]);

  await contract.waitForDeployment();

  // Write contract address to contractAddress.json
  const address = JSON.stringify({ address: contract.target }, null, 4);

  fs.writeFile('./app/abis/contractAddress.json', address, 'utf8', (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  console.log(`Smart Contract deployed at address ${contract.target}`);

  // Add dummy projects
  await addDummyProjects(contract);
}

async function addDummyProjects(contract: any) {
  const convertToTimestamp = (dateString: string) => Date.parse(dateString) / 1000;

  for (const project of dummyProjects) {
    await contract.createProject(
      project.title,
      project.description,
      project.imageURLs,
      project.category,
      hre.ethers.parseEther(project.cost.toString()), // Convert cost to wei
      convertToTimestamp(project.expiresAt)
    );
  }

  console.log('Dummy projects added successfully');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
