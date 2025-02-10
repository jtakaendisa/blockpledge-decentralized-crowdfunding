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
    'bafkreieywgodxdzb5hv27mfm2dzjaywzg4o2ycgbkqde6qkbywsag7fk7e',
    'bafkreih6b4s44pxh3zazd75iczgpzt23kx4s4bpyc34dgi2azbu2m5hfge',
    'bafkreifzkdcmzhqvef26ancfvlg6qvchadlu5uapng5ync63vbyda5qnga',
    'bafkreib7e67vtogupziuwhu3hgk6kedc3j5njchtqxxthnzd6lirjn57iu',
    'bafkreicvxixy62rjnfjrohtnkikj42slnesblyowv2wdtgghcq45u5wzoe',
    'bafkreifihfbef7nbhow5ggmhckpnv7f6ge3culaq7fosq7ynkqg2e47gba',
    'bafkreigskyxuv6bbbgxzospjrpkgnhvgwvjg3ngbizleyxdhyyagybbvne',
    'bafkreiadwttp2pkt2xs35noy6kpnfzvcpbaocpr4tshoo5egib5fle3zxu',
    'bafkreicjn7jhggk3x42acvof3g4zknnc76knvpbknxe7zz4pzn34r3mz3u',
    'bafkreieoie4v4kyngz6ob6cec4466bj7y232gbxnl5esosbnsk63qrclwm',
  ],
  1: [
    'bafkreic63s4ohjiyeask6fxrzefr2klvr2jlvnua6sh64durn322e2hlhu',
    'bafkreic6wye4dd3vux6aggk4svpmzjwwvcfumaog4cgiwxfs3hjuyelf6y',
    'bafkreic4fds6mimkwbqfpss2mnllryepduad6s3356a76lvbpkg7ebstdq',
    'bafkreienzk4xk4f3a564bg7xrwuiabo6v6upj4ktws63ovlmnixtn7itz4',
    'bafkreib5tnq3fbq3lgw2hol2kwt43sritm5pgs6ipiqjybrvzhomeyrdey',
    'bafkreibm34hsfcslmdccrlsn5qe4k3spi7jcfvcz64zsdmi4fjevenwseu',
    'bafkreieka5lumhwf2lr3igt5dkpc4qb35e6wfznhjjo3hfiejjsepy2bke',
    'bafkreianohuw67weg3but5j45tmoe6u76qegfqkh4rntyc5rrajj2rn7aa',
    'bafkreibdhu6kjwnmf3vrkk4lzsu6quockkjonpstqiafovjuprrwqjk3bq',
    'bafkreibxxzboj7emtadkrgpr2kfjhdr3c36f223vuuqigyrki7zzamcu74',
  ],
  2: [
    'bafkreiabymjkshvmtf2hqeuwulgnkyhfogazovfyymyizej6qgk73ilqze',
    'bafkreiare7msas2h7ymju5napoqkj6545aqtye4ye6vwpyi5k3j5j7nspe',
    'bafkreibq36iklzrnldxfs72qivszfrptz7zu7mtv6tnqea5vznh5tk2yd4',
    'bafkreib5ki7xl6wa533l5ptadxu2bvncfp6diekzamc2apq2f5qw2tx36a',
    'bafkreiddh3sqvzytb3h6ea5ezzqdhsuuvlyvsxnlyamlekhlaomnm2gz5a',
    'bafkreibr5uqk5g2gsml7eejc4gxme66ug5donrr2dpqoflbypixkwri4hy',
    'bafkreibjglyi6vfhp7ltmlwyerjrkzfu7v73fjixsjx4kqryukxiyxdnmq',
    'bafkreieqq5u6m5l44gwoobrqwz3zsdc36okpnti4fm4atcvffjvlf7em4m',
    'bafkreig6oqq7oc73tfnb4ulj7wgbhvfirugvjegfmfd3vkpesr25louvfy',
    'bafkreibpojuhd252sv5dff35xpbqkm73ieuk6wlxtxpp6i2czrgmszkjee',
  ],
  3: [
    'bafkreiaux7a44x6mhwf6ihdpdcgewsm6pp4sdsqxlclv2mrznqyfw7m464',
    'bafkreibd535pi3q4ahysoemmwbfbn2qa2a4nmzjtpki7yovpaxeh76p6di',
    'bafkreihzmtwuwqw53523g3ez3cem33gs2iayunj2wiv6lfkw2oizir3v4q',
    'bafkreihcl22dao5eg6vkaptyjw3cp242mkxrjygjywk46ks4ych5lpbbky',
    'bafkreidvapuhgj7xxzlb5hxgiahvwip3iy3zklsrkek2fmpvtb7hjpsswm',
    'bafkreicuotbvlfondtxrkck263endwyqow64twx6oxeymkbs7mn6hjso5q',
    'bafkreidpe6xzv6oitolllfhx5w22blacajucosr2gmibwjvascm4vxswou',
    'bafkreiddv2wjhnr6yxnoqybt7aannnsur5erpa5d2brjekx53bhrln6vx4',
    'bafkreido2zcbtr6sb3zfkjnlrz3shgdxrk5hisdwghlsdryyjnpugxphtq',
    'bafkreighm7uuy7k2oxwheddpftz6xkeful43shrfadtu2fouo3lqclt7ri',
  ],
  4: [
    'bafkreicqv57qmkonqbjmpfqemzgpppjr66uh22k42a46jtbxqzbczdul6i',
    'bafkreif5s7wvfa3khm6a2vaqdpqyf5k7ece2yxi43n2jfvp4uvzkrzmhtu',
    'bafkreiavphhtrquph6ffwdtxpbcbzz6aqr5le7xzqvqpmktyo5l7woyyay',
    'bafkreiefo3hqtrk2zi44ppehyzozpn5wfh4uuhck7cut72nerscp5tswwq',
    'bafkreigdnvxmxyxsbqqhruqtrzak7n2lhmyknj2k77f5q3nttbe4rs4pzu',
    'bafkreieir2wi57wej6wrpyhnyeczkrxned2askerbkndlugdeb6f2sfg7a',
    'bafkreifuvrxqyjyoe3k557jo7bn5dsobmpyjdrpllwnffsanirkaw2owoy',
    'bafkreihdqalvipvqrw452pwp43oxdhk2j4kbobxcogcfwswmojtoinahfi',
    'bafkreias6tkb4v3ooxfxr4idexh6b5rpff7aevgz4jvd7gcckbbmzvgw5y',
    'bafkreietq7mmd6x6mleohu3ownkyhgb577xdc64hyc2v57ccloq4fkimiq',
  ],
  5: [
    'bafkreiflwwsxitnyx6kobc57y3rjhmsnrvefrxtgo3tpqvikzkdruwptem',
    'bafkreiarrdd6d5rx3knedyq7wfcggauvnjgeeygp34yz4h7quudcfysl3e',
    'bafkreicanmtpc3k3e37fxka4jizuqxcp5w7t65za5cssh6ina53gikas74',
    'bafkreieeb4wpluig6zapy5glhhbebuljcdgvs6bfjzzr7ot7ew7kf36cym',
    'bafkreicmwr6ry4to5c2w5dimaeymiafaewupkk7xxgcbpuu5bkikit54we',
    'bafkreiey3stg4k2ginhite3t42vdxhexpcp3hu6bu34noprdgak746nqam',
    'bafkreiggw5oidcuubmwn5viqdxlxffzav4spoatbcwtk5wxk4nrl64iwmy',
    'bafkreiextm5rda7gpalhxfeue7hmu4vnemeaz5spclx6476lt72l7dlezy',
    'bafkreidqy4k3ppppqiripjbomsxytr3aovbkasjc2vxebqntx6lry5oby4',
    'bafkreif3dx34r4kvxlvwzjx6w4patsab4biun4rqo3cohqprrrqwt7rlmq',
  ],
  6: [
    'bafkreifows2m2uqwqnro4jv2m5xoyt6nqybsp3d4mgcieymqssohduurba',
    'bafybeigyekmjni2s6irf2k2k56v5kzyk4aopwhptizj2ov4rvfqhu54xz4',
    'bafkreicvmf7ej6kvybgoukpvk7hvebyk7y3ktcxcsrhzufjb3w7a64nocq',
    'bafkreiesv7bist73dhapasfz4bfohvmyzmawe6tcpkml3yrml2kenba5pu',
    'bafkreihkewwrkg4r76qxt7zlrie3dchzhj5rgkewgxcv45jovjxtgpiway',
    'bafkreibnaodrcdy3ssbuylhomkcfi7o53bohrxhntl4wdjmhbvj2d3gju4',
    'bafkreic2ltfjaza62wna452hd3ea55uexvznlcokesa2zie5kmopl4fw5m',
    'bafkreifyhsesrmizmwtto363xq2gzurqkwa3a4z6kepg467wav6raufbcm',
    'bafkreidemnkcjbkglxeyk4t3ud6qcqvktgknumaj7uudsqk2jo5ffqbygu',
    'bafkreiffeh63qwy27obfbibeb3auk3e6zpzxcpejnsbrtxjslz2nlwtgl4',
  ],
  7: [
    'bafkreiflahf56g3blp6xu3srum5mupdmywv2pl5gnbh3u6y4qxemmstgp4',
    'bafkreicbg6a2zndikk4xwxtsps3srhsqgrlrffhaktpbnniay2iaavccde',
    'bafkreigyrd64itr4flhgxo7gmdqibgxxzo5a2m6k3fv4tkbva6iss7p2by',
    'bafkreiak3eedowzlin3onax2p7cwtnooruojg46b6jxbvuzntqzpqx6zlu',
    'bafkreifx33mbntwftxkezlysdjhyxqchwpkbk7fpxr2v7bbmid2aq2teh4',
    'bafkreibffo27thabc7euctf2wwhoacmxpvg4e7mec6joji3fqas4llzkqi',
    'bafkreihgnlspmn7ywiqqdqhrlim3ubdfh5awlfpneqbdhigttwzhejleea',
    'bafkreiavhzfbguhwqvzemn46v5v7ouuzjelnhxl6ounalmavvxiynydmki',
    'bafkreie7fm7f5pwmaldbzu6skvlapqgu35kfndg6ffzq27mfnq6ejxhh4e',
    'bafkreifzn7mdee3cmgtcdtavxdkttwm7hkonj3iu5afxiwnyfm6kdrhcmu',
  ],
  8: [
    'bafkreigeaptwnu46fkvaatf3notuksksseauwnqzym6egulj6lju4qta6q',
    'bafkreidonfta2rvpomsv5res2y6ohmzhxyzld6dz5bc5x62ufawsgctoqu',
    'bafkreiesrqpmkruu6lzt4tqivemmtgoipehqpj5k3uamfhlxp7qmljmbty',
    'bafkreicego4kyu36yymzweno3nbe4vdeesa5idilki4dch3pdhb7nyygta',
    'bafkreiewwrsjrtmagfv4q5bllcj2qtzehamozhbmh7q7elgx4zx2fz2tpm',
    'bafkreibozetntgfnx7slcjzdusufntjauylrlsvqecvfpzuzex44mfd43e',
    'bafkreiars4ca2inen3jazl7qxdb5tz5cnh7gj6llcakpvrm5j2olcuxoie',
    'bafkreifeawsqv6o2lklzz54rxvsqpcfixvhri6nqqdqo6wkzcxyccqv5h4',
    'bafkreigbahegcajdmxhhxbgnajdhjdnhu3tqeq2bhsvwnruoltkm2xzpxu',
    'bafkreih46dwekkfexsmoif3jwbgon57e2m5ynwufal64hbq4evjyc775vq',
  ],
  9: [
    'bafkreicpltgtziimwtnkio7p25a6fhds5rlyh7kajkpsacz5rw2m7qzkx4',
    'bafkreigewy6gyc47f3o3ooe3azzbjijbycdhihpc3rgzccl77oggwznmie',
    'bafkreifobrzthq7n2h4zf5ug7pxqaj3rf6wnbhokbehr42x35e7gzlm4s4',
    'bafkreia6aftoqwl3lqppqe7zo3yfwyfxuubpysrxvv7oawmn4kfhbt47pa',
    'bafkreidnmcz76prr7hue5foxkawdmqomkbqlun5oagwerusxqpclnbpeo4',
    'bafkreid34z3jg7z7byuapxctm2wltluttffixdrwzuuqbsxggpnf2pvgdm',
    'bafkreiei4ghl7mssakr7fdegnrkxos6gqde3nu2h53tfzaukldgj7kgk7q',
    'bafkreied37fq7q6doaoae5vjrfvbcmkor44huq45msalzkz4xp5yunnvti',
    'bafkreibn2jjauxvd3id62jzihgypqxyw7y4pokj5k6imvf3gmtqzctcxzy',
    'bafkreibclm727qpjlnmzc6aa3safb5klkndveckhlt3q53q5akkp4dksvu',
  ],
  10: [
    'bafkreiawpkbhqxf4mle4j3ep6ugfd2h5hj4lhfr4imuhfr5sq7rikws33y',
    'bafkreiak3zrv2mq47i5sxzb7g3blcslhplywswfvo3ofpmyqcrhbv3zvji',
    'bafkreicccnb6ppjowoy6js6yx4bw2ymxltaubdll6gw63q5d5qg53h6uwi',
    'bafkreifw3hxbqr57pscle4xxfyrq55tn2fw7ekxobuzzllnpjmwxflboj4',
    'bafkreib4twobbfltbvdj7y3p5uskck5zbjgne6wrg7st2hrwqjeqsmrzxa',
    'bafkreihdqxgqo6yqxp7zixamg5fyarwgq3ppihn6iivcqf4bvs6uwhygli',
    'bafkreieqtexgzr65qj34o4an3ppka7npv66vkor5ewfikikfrt5hdvf3se',
    'bafkreidmkhf7vdwzkvnj2omoaz4n5pgxydndetiyq5ovevjr6555kg2zbm',
    'bafkreiditgpkop6zjancnrllufmrhovpe5wvmkfc6xgxdqi4zjzyv45zu4',
    'bafkreihw3sgmw3xfn352scoukbevjvnxec66wd3fofqtglcj46uqee65ee',
  ],
  11: [
    'bafkreifhiw6hwobhvv2bvppkxvxeza2wnoulnfyafiafqfpk46i7yxce7a',
    'bafkreifydgtbib7udjldwqxhjdxxfhxqgowrphui4uu5a6xnvtxq76cqqm',
    'bafkreibweh2hvbpuovso4buv3tnthdxmar2qsq46rdsoe37km3hyq5op6u',
    'bafkreidoxratlbbs4g6kchwnroodl2th52omxyvbpxzsnvlqh44aebjany',
    'bafkreiesfn5egw4j3jilzlkskqwzvxdpwfcmzil4gwxja5emlyfcgwngpq',
    'bafkreic5w6vay3pic2kg5zytmxxkmmnj7souyoz2x5ipbojzw3uiw5wnje',
    'bafkreihmvgpq4lze2mhjxdwukmlwhyrl4chdp7ehdubivg4ktrt5zd6ete',
    'bafkreihnsmaqk4mrxwf4e6o7qxkhkur3dxs37gmbqu5y7lrkctycqyd3t4',
    'bafkreierm7jef2l2puog64i3xjbabsozjxehm3dbp5g6tlh4q6q3juabre',
    'bafkreieprwhc22t3xcd6cdxqwfweoqqblzuiaqjnlgojq4y4wlpiwa5x6m',
  ],
};

const dummyProjects = [
  {
    title: 'Empowering Local Artists',
    description:
      'Support local artists in showcasing their talents and bringing their creative projects to life.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 100,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Innovative Tech Startup',
    description:
      'Back a cutting-edge technology startup revolutionizing the industry with its groundbreaking solutions.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Building Sustainable Communities',
    description:
      'Contribute to sustainable community projects aimed at improving living conditions and fostering social cohesion.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Fashion with Purpose',
    description:
      'Invest in eco-friendly fashion brands committed to ethical production practices and environmental conservation.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Food Revolution',
    description:
      'Support small-scale food producers and artisans in bringing their high-quality products to a wider audience.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 50,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Gaming Experience',
    description:
      'Back an innovative gaming project that promises to deliver immersive gameplay and unforgettable adventures.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Discover Hidden Gems',
    description:
      'Support local tourism initiatives that promote off-the-beaten-path destinations and authentic cultural experiences.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Empowering Education for All',
    description:
      'Invest in educational projects that provide equitable access to quality learning opportunities for learners of all ages.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Holistic Wellness Retreat',
    description:
      'Support wellness retreats that promote holistic healing and well-being through yoga, meditation, and healthy living practices.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'DIY Crafting Workshops',
    description:
      'Back DIY crafting workshops that empower individuals to unleash their creativity and learn new skills in a fun and supportive environment.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 70,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain Innovation Hub',
    description:
      'Invest in blockchain startups and projects driving innovation and disrupting traditional industries with decentralized technologies.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Animal Welfare Advocacy',
    description:
      'Support animal welfare organizations and initiatives dedicated to rescuing, rehabilitating, and rehoming animals in need.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 40,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Revolution',
    description:
      'Back renewable energy projects aimed at accelerating the transition to clean and sustainable energy sources.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Revolutionizing Healthcare',
    description:
      'Invest in groundbreaking healthcare innovations that improve patient outcomes and enhance quality of life.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Empowering Rural Communities',
    description:
      'Support initiatives empowering rural communities through access to education, healthcare, and economic opportunities.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Collective',
    description:
      'Back sustainable fashion collectives committed to ethical production, fair trade practices, and environmental stewardship.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 100,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farming Initiative',
    description:
      'Support urban farming initiatives transforming vacant lots and rooftops into productive urban farms to address food insecurity.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Experience',
    description:
      'Back virtual reality gaming projects offering immersive gameplay experiences and pushing the boundaries of VR technology.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Culinary Adventure Tours',
    description:
      'Invest in culinary adventure tours showcasing diverse cuisines, local flavors, and culinary traditions from around the world.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Digital Learning Platforms',
    description:
      'Support digital learning platforms providing accessible and affordable education to learners worldwide, regardless of geographic location.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mindfulness Retreats',
    description:
      'Back mindfulness retreats offering meditation, yoga, and wellness practices to promote mental clarity, emotional balance, and inner peace.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Handcrafted Goods',
    description:
      'Invest in artisanal handcrafted goods made with passion and skill, preserving traditional craftsmanship and cultural heritage.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 70,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Decentralized Finance Projects',
    description:
      'Support decentralized finance (DeFi) projects revolutionizing traditional finance systems through blockchain technology and smart contracts.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Initiatives',
    description:
      'Back wildlife conservation initiatives protecting endangered species, preserving habitats, and promoting biodiversity conservation.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 90,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Innovative Art Installation',
    description:
      'Support the creation of an innovative art installation that challenges perceptions and sparks meaningful conversations.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Cutting-Edge Tech Startup',
    description:
      'Invest in a cutting-edge tech startup developing groundbreaking solutions to address real-world challenges and disrupt industries.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Expansion',
    description:
      'Support the expansion of a community garden initiative providing fresh produce, educational programs, and green spaces to urban neighborhoods.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 100,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Collective',
    description:
      'Back an ethical fashion collective committed to sustainable practices, fair wages, and transparent supply chains in the fashion industry.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Food Innovation Hub',
    description:
      'Invest in a food innovation hub fostering collaboration, research, and development of sustainable food technologies and alternative protein sources.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Virtual Reality Experience',
    description:
      'Back an immersive virtual reality experience that transports users to fantastical worlds, immersive narratives, and interactive adventures.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Cultural Heritage Preservation',
    description:
      'Support initiatives dedicated to preserving cultural heritage sites, artifacts, and traditions for future generations to appreciate and learn from.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Learning Platform Expansion',
    description:
      'Invest in the expansion of an online learning platform providing accessible education and skill development opportunities to learners worldwide.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wellness Retreat Center',
    description:
      'Back the development of a wellness retreat center offering holistic healing, mindfulness practices, and rejuvenating experiences in a serene natural setting.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisan Crafts Collective',
    description:
      'Invest in an artisan crafts collective showcasing traditional craftsmanship, unique designs, and handmade creations crafted with passion and skill.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Financial Inclusion',
    description:
      'Support blockchain-based financial inclusion initiatives providing access to banking, loans, and financial services to underserved communities globally.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 170,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Rehabilitation Center',
    description:
      'Back the establishment of a wildlife rehabilitation center dedicated to rescuing, rehabilitating, and releasing injured and orphaned wildlife.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Public Art Installation',
    description:
      'Contribute to the creation of an interactive public art installation that engages communities, fosters connections, and celebrates diversity.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Powered Supply Chain Solution',
    description:
      'Invest in a blockchain-powered supply chain solution that enhances transparency, traceability, and sustainability in global supply chains.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Youth Empowerment Program Expansion',
    description:
      'Support the expansion of a youth empowerment program providing mentorship, skills training, and leadership development opportunities to young people.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Collective',
    description:
      'Back a sustainable fashion collective dedicated to eco-friendly practices, ethical production, and promoting a circular economy in the fashion industry.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farming Initiative',
    description:
      'Invest in an urban farming initiative transforming vacant lots into vibrant urban farms, producing fresh, locally grown produce for urban communities.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Storytelling Experience',
    description:
      'Support the creation of an immersive storytelling experience that combines technology, art, and narrative to transport audiences to new worlds and perspectives.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Historic Site Restoration Project',
    description:
      'Back a historic site restoration project aimed at preserving cultural heritage, reviving historical landmarks, and promoting heritage tourism.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Coding Bootcamp Expansion',
    description:
      'Invest in the expansion of an online coding bootcamp providing accessible coding education, job placement support, and career advancement opportunities.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Holistic Wellness Resort',
    description:
      'Back the development of a holistic wellness resort offering healing therapies, wellness retreats, and transformative experiences in a tranquil natural setting.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Jewelry Collective',
    description:
      'Invest in an artisanal jewelry collective showcasing handcrafted jewelry designs, traditional craftsmanship, and ethically sourced materials.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 80,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain for Social Impact',
    description:
      'Support blockchain for social impact initiatives leveraging distributed ledger technology to address social, environmental, and humanitarian challenges.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 170,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Marine Conservation Project',
    description:
      'Back a marine conservation project focused on protecting marine ecosystems, conserving marine species, and promoting sustainable ocean management.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Mural Project',
    description:
      'Support the creation of a community mural project that brings together local artists, residents, and stakeholders to beautify public spaces and foster civic pride.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Healthcare Platform',
    description:
      'Invest in an AI-powered healthcare platform revolutionizing healthcare delivery, patient care management, and medical diagnostics through advanced technology.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Green Spaces Initiative',
    description:
      'Back a green spaces initiative dedicated to creating and maintaining urban green spaces, parks, and gardens to enhance urban livability and environmental sustainability.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Label',
    description:
      'Support an ethical fashion label committed to fair labor practices, sustainable sourcing, and eco-friendly production methods in the fashion industry.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Kitchen Expansion',
    description:
      'Invest in the expansion of a community kitchen providing nutritious meals, food assistance, and culinary training programs to individuals and families in need.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Experience',
    description:
      'Back the development of a virtual reality gaming experience that offers immersive gameplay, interactive storytelling, and cutting-edge virtual worlds for gamers.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Preservation of Cultural Heritage',
    description:
      'Support the preservation of cultural heritage sites, artifacts, and traditions to safeguard cultural identity, promote cultural diversity, and preserve historical legacies.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Language Learning Platform',
    description:
      'Invest in an online language learning platform offering language courses, interactive lessons, and language proficiency assessments for learners worldwide.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wellness Retreat Center',
    description:
      'Back the development of a wellness retreat center offering holistic wellness programs, yoga retreats, and mindfulness workshops in a serene natural setting.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Ceramic Studio',
    description:
      'Support an artisanal ceramic studio creating handcrafted ceramic pottery, ceramics workshops, and artistic collaborations with local artisans.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Voting System',
    description:
      'Invest in a blockchain-based voting system enabling secure, transparent, and tamper-proof voting processes for elections, referendums, and governance.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Initiative',
    description:
      'Back a wildlife conservation initiative focused on protecting endangered species, preserving natural habitats, and combating wildlife trafficking.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Public Art Installation',
    description:
      'Support the creation of a large-scale public art installation that celebrates cultural diversity, fosters community engagement, and enhances urban landscapes.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Powered Supply Chain',
    description:
      'Invest in a blockchain-powered supply chain solution optimizing transparency, traceability, and efficiency in global supply chain management and logistics.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Youth Empowerment Program',
    description:
      'Back a youth empowerment program providing mentorship, leadership development, and educational opportunities for at-risk youth to unlock their full potential.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Label',
    description:
      'Support a sustainable fashion label committed to eco-friendly materials, ethical production practices, and fair trade partnerships in the fashion industry.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farming Initiative',
    description:
      'Invest in an urban farming initiative promoting urban agriculture, local food production, and food security through rooftop gardens, community farms, and hydroponic systems.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 120,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Virtual Reality Experience',
    description:
      'Back the development of an immersive virtual reality experience offering virtual tours, interactive simulations, and educational content for immersive learning.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Historical Preservation Project',
    description:
      'Support a historical preservation project dedicated to conserving and restoring historical landmarks, buildings, and cultural heritage sites for future generations.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Tutoring Platform',
    description:
      'Invest in an online tutoring platform providing personalized tutoring sessions, homework help, and academic support for students of all ages and subjects.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mindfulness Retreat Center',
    description:
      'Back the establishment of a mindfulness retreat center offering meditation retreats, wellness workshops, and mindfulness-based stress reduction programs.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artisanal Woodworking Studio',
    description:
      'Support an artisanal woodworking studio crafting handmade wooden furniture, home decor items, and custom woodworking projects using sustainable wood materials.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Startup',
    description:
      'Invest in a renewable energy startup developing innovative solar, wind, and hydroelectric power solutions to accelerate the transition to clean and sustainable energy sources.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Animal Shelter Expansion',
    description:
      'Support the expansion of an animal shelter facility to provide shelter, care, and adoption services for stray and abandoned animals in need of loving homes.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Artificial Intelligence Research',
    description:
      'Back a research project focused on advancing artificial intelligence technologies for applications in healthcare, finance, robotics, and natural language processing.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mobile Health App Development',
    description:
      'Invest in the development of a mobile health app offering personalized health tracking, remote patient monitoring, and telemedicine services for improving health outcomes.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Project',
    description:
      'Support a community garden project promoting urban agriculture, food sustainability, and community engagement through shared gardening spaces and educational workshops.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Studio',
    description:
      'Back a virtual reality gaming studio creating immersive VR games, experiences, and simulations for gaming enthusiasts and virtual reality enthusiasts.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Cultural Exchange Program',
    description:
      'Invest in a cultural exchange program fostering cross-cultural understanding, intercultural dialogue, and global citizenship through international exchange opportunities.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Collection',
    description:
      'Support the launch of a sustainable fashion collection featuring eco-friendly clothing, accessories, and lifestyle products made from recycled materials and organic fabrics.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Learning Platform',
    description:
      'Back an online learning platform providing interactive courses, tutorials, and educational resources covering a wide range of topics and disciplines for lifelong learners.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Initiative',
    description:
      'Invest in a wildlife conservation initiative dedicated to protecting endangered species, conserving natural habitats, and combating illegal wildlife trafficking.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Space Exploration VR Experience',
    description:
      'Back the development of a groundbreaking virtual reality experience that allows users to explore distant planets, moons, and galaxies, providing an immersive journey through the cosmos.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ocean Cleanup Drone Fleet',
    description:
      'Support the deployment of an autonomous drone fleet designed to remove plastic pollution and debris from oceans worldwide, contributing to marine conservation efforts and protecting marine ecosystems.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Assistant',
    description:
      'Invest in the development of an artificial intelligence-powered personal assistant that helps users manage their daily tasks, schedule appointments, organize meetings, and streamline productivity.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Vertical Farming Initiative',
    description:
      'Back a vertical farming initiative that utilizes innovative agricultural technologies to grow fresh produce in urban environments, reducing food miles, conserving water, and promoting sustainable agriculture.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Art Installation',
    description:
      'Support the creation of a large-scale art installation powered by renewable energy sources such as solar panels and wind turbines, showcasing the beauty and potential of clean energy solutions.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Voting System',
    description:
      'Back the development of a secure and transparent blockchain-based voting system that ensures the integrity and fairness of elections, enabling secure and verifiable voting processes.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community-Owned Renewable Energy Project',
    description:
      'Invest in a community-owned renewable energy project that enables local communities to collectively own and benefit from renewable energy infrastructure, fostering energy independence and sustainability.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Healthcare Diagnosis Platform',
    description:
      'Support the development of an AI-powered healthcare diagnosis platform that uses machine learning algorithms to analyze medical data and assist healthcare professionals in accurate diagnosis and treatment planning.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Music Production Studio for Underserved Youth',
    description:
      'Back the establishment of a music production studio dedicated to providing free access to recording equipment, musical instruments, and mentorship programs for underserved youth, empowering them through music creation.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Art Installation for Public Spaces',
    description:
      'Support the creation of an interactive art installation designed for public spaces, engaging audiences through immersive experiences, visual storytelling, and interactive technology, enriching urban environments with artistic expression.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Renewable Energy Art Installation',
    description:
      'Support the creation of a large-scale art installation powered by renewable energy sources such as solar panels and wind turbines, showcasing the beauty and potential of clean energy solutions.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Assistant',
    description:
      'Invest in the development of an artificial intelligence-powered personal assistant that helps users manage their daily tasks, schedule appointments, organize meetings, and streamline productivity.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ocean Cleanup Drone Fleet',
    description:
      'Support the deployment of an autonomous drone fleet designed to remove plastic pollution and debris from oceans worldwide, contributing to marine conservation efforts and protecting marine ecosystems.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community-Owned Renewable Energy Project',
    description:
      'Invest in a community-owned renewable energy project that enables local communities to collectively own and benefit from renewable energy infrastructure, fostering energy independence and sustainability.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Food Waste Reduction App',
    description:
      'Back the development of a mobile application that helps users reduce food waste by providing recipes based on available ingredients, meal planning tools, and expiration date reminders.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Music Production Studio for Underserved Youth',
    description:
      'Back the establishment of a music production studio dedicated to providing free access to recording equipment, musical instruments, and mentorship programs for underserved youth, empowering them through music creation.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Voting System',
    description:
      'Back the development of a secure and transparent blockchain-based voting system that ensures the integrity and fairness of elections, enabling secure and verifiable voting processes.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Healthcare Diagnosis Platform',
    description:
      'Support the development of an AI-powered healthcare diagnosis platform that uses machine learning algorithms to analyze medical data and assist healthcare professionals in accurate diagnosis and treatment planning.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Vertical Farming Initiative',
    description:
      'Back a vertical farming initiative that utilizes innovative agricultural technologies to grow fresh produce in urban environments, reducing food miles, conserving water, and promoting sustainable agriculture.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Finance & Investment Education Platform',
    description:
      'Support the development of an online platform that provides comprehensive financial education resources, investment tutorials, and personal finance management tools to empower individuals with financial literacy.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Trainer App',
    description:
      'Back the development of a mobile application that utilizes artificial intelligence to create personalized workout plans, track fitness progress, and provide real-time coaching and motivation to users.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 240,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Pet Adoption & Rescue Network',
    description:
      'Support the creation of an online platform that connects pet lovers with shelters, rescue organizations, and adoptable pets, facilitating pet adoption, fostering, and community support for animal welfare.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Art Installation',
    description:
      'Support the creation of an interactive art installation that engages viewers through immersive experiences, combining visual, auditory, and tactile elements to evoke emotions and spark creativity.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Blockchain-Based Supply Chain Transparency Platform',
    description:
      'Back the development of a blockchain-based platform that enhances supply chain transparency and traceability, allowing consumers to verify the authenticity, origin, and ethical practices of products.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Expansion Project',
    description:
      'Support the expansion of a community garden initiative that provides accessible green spaces for urban residents, promotes urban agriculture, and fosters community engagement through gardening activities.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Design Workshop',
    description:
      'Back a sustainable fashion design workshop that educates aspiring designers on eco-friendly practices, ethical sourcing, and circular fashion principles, fostering a more sustainable future for the fashion industry.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Zero-Waste Grocery Store Initiative',
    description:
      'Support the establishment of a zero-waste grocery store that offers package-free and bulk food options, encourages reusable packaging, and promotes waste reduction and sustainable consumption habits.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Gaming Experience',
    description:
      'Back the development of a virtual reality gaming experience that transports players to immersive worlds, offering engaging storytelling, interactive gameplay, and social multiplayer interactions.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ecotourism Adventure Expedition',
    description:
      'Support an ecotourism adventure expedition that explores remote and biodiverse locations, immersing travelers in nature while promoting environmental conservation, cultural exchange, and sustainable travel practices.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 350,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Learning Platform for Healthcare Professionals',
    description:
      'Back the development of an online learning platform tailored for healthcare professionals, offering continuing education courses, medical simulations, and certification programs to enhance clinical skills and knowledge.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Fitness Park Construction',
    description:
      'Support the construction of an urban fitness park equipped with outdoor gym equipment, jogging tracks, and recreational facilities, providing free fitness opportunities for city residents to promote active and healthy lifestyles.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Financial Literacy Workshops for Low-Income Families',
    description:
      'Back a series of financial literacy workshops aimed at empowering low-income families with money management skills, budgeting strategies, and resources to build financial stability and achieve economic independence.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Investment Advisory Platform',
    description:
      'Support the development of an AI-powered investment advisory platform that analyzes market trends, evaluates investment opportunities, and provides personalized recommendations to help users make informed investment decisions.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Animal Sanctuary Expansion Project',
    description:
      'Back the expansion of an animal sanctuary dedicated to rescuing and providing lifelong care for abused, abandoned, and neglected animals, offering rehabilitation programs and educational experiences for visitors.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Digital Art NFT Exhibition',
    description:
      'Support the creation of a digital art NFT exhibition showcasing innovative digital artworks by emerging artists, leveraging blockchain technology to enable secure ownership and trading of digital assets.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Smart Home Automation System',
    description:
      'Back the development of a smart home automation system that integrates IoT devices, AI algorithms, and voice recognition technology to streamline household tasks, enhance security, and improve energy efficiency.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Recycling Program',
    description:
      'Support a community recycling program aimed at raising awareness about environmental conservation, reducing waste, and promoting responsible recycling practices through education, outreach, and infrastructure improvements.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 150,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Label Launch',
    description:
      'Back the launch of an ethical fashion label committed to sustainability, fair labor practices, and transparency in the fashion supply chain, offering stylish and eco-friendly clothing options for conscious consumers.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Agriculture Initiative',
    description:
      'Support an urban agriculture initiative that transforms vacant lots and rooftops into productive urban farms, providing fresh produce to local communities, promoting food security, and fostering green urban spaces.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Immersive Virtual Reality Concert Experience',
    description:
      'Back the development of an immersive virtual reality concert experience that allows music fans to enjoy live performances from their favorite artists in a virtual venue, offering an interactive and lifelike concert experience.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Eco-Tourism Resort',
    description:
      'Support the development of a sustainable eco-tourism resort that promotes responsible tourism, preserves natural ecosystems, and supports local communities, offering eco-friendly accommodations and immersive nature experiences.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 350,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Online Medical Education Platform',
    description:
      'Back the creation of an online medical education platform offering high-quality medical courses, virtual simulations, and clinical training modules for healthcare professionals, students, and lifelong learners.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Outdoor Fitness Trail Installation',
    description:
      'Support the installation of an outdoor fitness trail equipped with exercise stations, fitness equipment, and jogging paths, providing a free and accessible outdoor fitness facility for the community to enjoy.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Financial Literacy Program for Youth',
    description:
      'Back a financial literacy program designed for youth, providing interactive workshops, educational resources, and mentorship opportunities to empower young people with essential money management skills and financial knowledge.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 170,
    expiresAt: getRandomDate(),
  },
  {
    title: 'AI-Powered Personal Finance Assistant',
    description:
      'Support the development of an AI-powered personal finance assistant that offers personalized financial advice, budgeting tools, and investment recommendations to help individuals achieve their financial goals and build wealth.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Project',
    description:
      'Back a wildlife conservation project focused on protecting endangered species, preserving natural habitats, and promoting biodiversity conservation through research, community engagement, and conservation initiatives.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Dreamscape: Immersive Art Experience',
    description:
      'Step into the dream world with Dreamscape, an immersive art experience that combines augmented reality, interactive installations, and surreal landscapes to stimulate the senses and ignite the imagination.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Galactic Explorer: Space Exploration Game',
    description:
      'Embark on an epic space exploration journey with Galactic Explorer, a groundbreaking video game that lets players pilot spacecraft, discover alien worlds, and unravel the mysteries of the cosmos.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Eco-Friendly Fashion Show Extravaganza',
    description:
      'Witness the future of fashion at the Eco-Friendly Fashion Show Extravaganza, a star-studded event showcasing sustainable fashion designs, eco-friendly materials, and innovative recycling techniques.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Robo Revolution: AI Robotics Competition',
    description:
      'Join the Robo Revolution and support the next generation of AI robotics engineers as they compete in a high-stakes competition to build autonomous robots capable of tackling real-world challenges.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ocean Odyssey: Underwater Adventure Documentary',
    description:
      'Dive into the depths of the ocean with Ocean Odyssey, an awe-inspiring documentary that takes viewers on a journey to explore coral reefs, underwater caves, and the fascinating creatures that inhabit the sea.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 350,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Future Fusion: Culinary Innovation Lab',
    description:
      'Experience the future of food at Future Fusion, a culinary innovation lab where chefs experiment with cutting-edge techniques, molecular gastronomy, and sustainable ingredients to create mind-blowing gastronomic delights.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mind Matters: Mental Wellness Retreat',
    description:
      'Take a journey inward with Mind Matters, a transformative mental wellness retreat that offers mindfulness workshops, meditation sessions, and holistic therapies to nurture inner peace and emotional well-being.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Tech Titans: Startup Accelerator Program',
    description:
      'Empower the next generation of tech titans with Tech Titans, a startup accelerator program that provides funding, mentorship, and resources to visionary entrepreneurs building the technology of tomorrow.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 180,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Whisk & Wander: Culinary Adventure Tours',
    description:
      'Embark on a gastronomic journey with Whisk & Wander, a series of culinary adventure tours that take food enthusiasts on a mouthwatering exploration of local cuisines, hidden gems, and cultural delights.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Code Crusaders: Girls in Tech Coding Camp',
    description:
      'Empower girls to become future code crusaders with Code Crusaders, a coding camp designed to inspire, educate, and mentor young women in STEM fields, computer science, and technology.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 190,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Warriors: Conservation Expedition',
    description:
      'Join the ranks of wildlife warriors and embark on a conservation expedition to protect endangered species, restore natural habitats, and safeguard biodiversity in remote wilderness areas.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Arts Alive: Community Mural Project',
    description:
      'Bring communities together with Arts Alive, a community mural project that transforms public spaces into vibrant works of art, celebrates local culture, and fosters civic pride through collaborative art-making.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Art Therapy Program for Veterans',
    description:
      'Support an art therapy program tailored for veterans, providing them with a creative outlet to express emotions, cope with trauma, and promote mental well-being through therapeutic art-making sessions.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'STEM Scholarships for Underprivileged Students',
    description:
      'Back STEM scholarships for underprivileged students, enabling them to pursue higher education and careers in science, technology, engineering, and mathematics, bridging the opportunity gap and fostering diversity in STEM fields.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 200,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Garden Revitalization',
    description:
      'Fund the revitalization of a community garden, transforming it into a vibrant green space for urban agriculture, community gatherings, educational workshops, and environmental stewardship initiatives.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ethical Fashion Marketplace',
    description:
      'Support an ethical fashion marketplace that connects consumers with sustainable and eco-friendly fashion brands, promoting transparency, fair trade practices, and environmental conservation in the fashion industry.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 240,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Kitchen Renovation',
    description:
      'Help renovate a community kitchen to create a welcoming space for cooking classes, food distribution programs, and community meals, addressing food insecurity and promoting healthy eating habits in underserved neighborhoods.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 290,
    expiresAt: getRandomDate(),
  },
  {
    title: 'STEM Coding Club for Girls',
    description:
      'Back a STEM coding club designed for girls, providing them with coding skills, mentorship, and opportunities to explore careers in technology, empowering them to become future leaders and innovators in the tech industry.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Outdoor Fitness Park',
    description:
      'Support the creation of an outdoor fitness park equipped with exercise stations, walking trails, and recreational amenities, promoting physical activity, health, and social interaction in the community.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 210,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wellness Retreat for Caregivers',
    description:
      'Fund a wellness retreat tailored for caregivers, offering respite, relaxation, and self-care activities to recharge and rejuvenate those who provide care for loved ones with illnesses or disabilities.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'DIY Home Decor Workshop',
    description:
      'Back a DIY home decor workshop that teaches participants how to create personalized home decor items using sustainable materials and eco-friendly techniques, inspiring creativity and environmental consciousness.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 240,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Social Impact Investment Fund',
    description:
      'Invest in a social impact investment fund that channels capital into socially responsible ventures addressing pressing global challenges, such as poverty alleviation, environmental conservation, and access to healthcare and education.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Conservation Project',
    description:
      'Support a wildlife conservation project focused on protecting endangered species, preserving habitats, and promoting biodiversity conservation through scientific research, community engagement, and habitat restoration efforts.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Interactive Art Installation',
    description:
      'Create an interactive art installation that engages viewers through immersive experiences, multimedia elements, and interactive technology, fostering creativity, exploration, and community interaction.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 220,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Coding Bootcamp Scholarships',
    description:
      'Provide scholarships for individuals from underrepresented backgrounds to attend a coding bootcamp, empowering them with in-demand coding skills and opportunities for career advancement in the tech industry.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Greening Initiative',
    description:
      'Support an urban greening initiative aimed at creating green spaces, planting trees, and implementing sustainable landscaping practices in urban areas, improving air quality, enhancing biodiversity, and beautifying neighborhoods.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Eco-Friendly Fashion Line',
    description:
      'Launch an eco-friendly fashion line that prioritizes sustainable materials, ethical manufacturing processes, and fair labor practices, offering stylish and environmentally conscious clothing options to conscientious consumers.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 250,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Food Co-op',
    description:
      'Establish a community-owned food co-op that provides access to fresh, locally sourced produce, bulk goods, and healthy food options at affordable prices, fostering food security, sustainability, and community resilience.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Education Platform',
    description:
      'Develop a virtual reality education platform that offers immersive learning experiences across various subjects, enabling students to explore virtual environments, interact with educational content, and enhance their understanding of complex concepts.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 230,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Outdoor Adventure Playground',
    description:
      'Construct an outdoor adventure playground equipped with climbing structures, zip lines, and obstacle courses, providing children with opportunities for active play, exploration, and imaginative outdoor adventures.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 270,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mental Health Awareness Campaign',
    description:
      'Launch a mental health awareness campaign that promotes destigmatization, raises awareness about mental health issues, and provides resources, support, and education to individuals and communities.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'DIY Sustainable Living Workshops',
    description:
      'Organize DIY sustainable living workshops that teach participants how to reduce waste, conserve energy, and adopt eco-friendly practices in their daily lives, promoting environmental stewardship and sustainable living.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 260,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Social Impact Investing Platform',
    description:
      'Develop a social impact investing platform that connects investors with socially responsible investment opportunities, enabling them to align their financial goals with positive social and environmental outcomes.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Wildlife Habitat Restoration Project',
    description:
      'Support a wildlife habitat restoration project focused on restoring degraded habitats, reintroducing native species, and enhancing biodiversity conservation efforts in ecologically sensitive areas.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
    category: 11,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Community Mural Project',
    description:
      'Engage local artists and community members in creating a vibrant mural that celebrates cultural diversity, promotes unity, and revitalizes public spaces, fostering community pride and engagement.',
    imageUrls: getRandomImages(imageCategoryMap[0], 3),
    category: 0,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Clean Energy Microgrid Installation',
    description:
      'Install a clean energy microgrid system to power community buildings, homes, and businesses with renewable energy sources like solar and wind, reducing carbon emissions and increasing energy resilience.',
    imageUrls: getRandomImages(imageCategoryMap[1], 3),
    category: 1,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Youth Empowerment Center Expansion',
    description:
      'Expand a youth empowerment center to offer more educational programs, vocational training, and mentorship opportunities for underserved youth, empowering them to succeed academically and professionally.',
    imageUrls: getRandomImages(imageCategoryMap[2], 3),
    category: 2,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Sustainable Fashion Design Competition',
    description:
      'Organize a sustainable fashion design competition to showcase eco-friendly fashion designs, innovative materials, and circular fashion concepts, promoting sustainable fashion practices and raising awareness.',
    imageUrls: getRandomImages(imageCategoryMap[3], 3),
    category: 3,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Urban Farm-to-Table Restaurant',
    description:
      'Establish an urban farm-to-table restaurant that sources fresh produce from local urban farms and promotes sustainable agriculture, healthy eating, and community connections through farm-to-table dining experiences.',
    imageUrls: getRandomImages(imageCategoryMap[4], 3),
    category: 4,
    cost: 290,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Virtual Reality Art Gallery',
    description:
      'Create a virtual reality art gallery that showcases digital artworks, immersive installations, and interactive exhibits, providing artists with a platform to exhibit their work and audiences with unique art experiences.',
    imageUrls: getRandomImages(imageCategoryMap[5], 3),
    category: 5,
    cost: 320,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Ecotourism Lodge Development',
    description:
      'Develop an ecotourism lodge in a natural reserve or eco-friendly destination, offering sustainable accommodations, nature-based activities, and educational experiences to promote eco-tourism and conservation.',
    imageUrls: getRandomImages(imageCategoryMap[6], 3),
    category: 6,
    cost: 280,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Mental Health Awareness Campaign',
    description:
      'Launch a mental health awareness campaign to reduce stigma, raise awareness about mental health issues, and provide resources and support for individuals struggling with mental health challenges.',
    imageUrls: getRandomImages(imageCategoryMap[7], 3),
    category: 7,
    cost: 340,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Zero-Waste Lifestyle Workshops',
    description:
      'Organize zero-waste lifestyle workshops and events to educate individuals and communities about waste reduction, recycling, composting, and sustainable living practices, inspiring people to adopt a zero-waste lifestyle.',
    imageUrls: getRandomImages(imageCategoryMap[8], 3),
    category: 8,
    cost: 310,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Green Roof Installation',
    description:
      'Install green roofs on public buildings, commercial properties, and residential homes to reduce urban heat island effect, improve air quality, and enhance energy efficiency through natural insulation and stormwater management.',
    imageUrls: getRandomImages(imageCategoryMap[9], 3),
    category: 9,
    cost: 300,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Social Impact Investing Summit',
    description:
      'Host a social impact investing summit to convene investors, philanthropists, and social entrepreneurs, facilitating discussions, networking, and collaboration opportunities to drive positive social and environmental change.',
    imageUrls: getRandomImages(imageCategoryMap[10], 3),
    category: 10,
    cost: 330,
    expiresAt: getRandomDate(),
  },
  {
    title: 'Marine Conservation Awareness Campaign',
    description:
      'Launch a marine conservation awareness campaign to educate the public about ocean conservation, marine biodiversity, and the importance of protecting marine ecosystems, inspiring action and advocacy for ocean conservation.',
    imageUrls: getRandomImages(imageCategoryMap[11], 3),
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
      project.imageUrls,
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
