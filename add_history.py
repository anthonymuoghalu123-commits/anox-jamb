import json

p = "data/waec.json"

with open(p, encoding="utf-8") as f:
    data = json.load(f)

qs = [
("History is the study of","past events and human activities","future events","weather conditions","mathematical formulas"),
("One major source of history is","oral tradition","weather forecast","laboratory experiment","chemical equation"),
("Archaeology is the study of the past through","material remains","weather reports","modern newspapers only","mathematical calculations"),
("An archaeologist studies","artifacts and ancient remains","computer programs","weather systems","modern machines only"),
("A primary source is","evidence produced during the period being studied","a modern textbook only","a fictional story","a recent opinion"),
("A secondary source is","an account based on information from other sources","an original artifact","an ancient tool","an eyewitness object"),
("Oral tradition is passed from generation to generation by","word of mouth","printing only","photography only","computer coding"),
("An artifact is","an object made or used by humans","a natural cloud","a weather report","a mathematical formula"),
("A major problem with oral tradition is","possible distortion over time","lack of human involvement","excessive written evidence","automatic accuracy"),
("Historiography refers to","the study and writing of history","the study of plants","the study of rocks","the study of weather"),
("Ancient Egypt developed along the","River Nile","River Niger","River Congo","River Volta"),
("The pyramids of Egypt were mainly built as","tombs","markets","schools","fortresses"),
("The ancient Egyptian writing system was called","hieroglyphics","cuneiform","Latin","Arabic"),
("The Rosetta Stone helped scholars decipher","Egyptian hieroglyphics","Greek mythology","Roman law","African languages"),
("The pharaoh was the ruler of","ancient Egypt","ancient Ghana","Songhai","Benin"),
("Mesopotamia was located between the rivers","Tigris and Euphrates","Niger and Benue","Nile and Congo","Volta and Senegal"),
("The writing system developed by the Sumerians was","cuneiform","hieroglyphics","Latin","Greek"),
("The Roman Empire was centred around","Rome","Cairo","Kano","Timbuktu"),
("The Greek city-state famous for military discipline was","Sparta","Athens","Corinth","Thebes"),
("Athens was famous for the development of","democracy","feudalism","colonialism","mercantilism"),
("The trans-Saharan trade linked North Africa with","West Africa","East Africa only","Southern Africa only","Europe only"),
("A major commodity exported from West Africa during trans-Saharan trade was","gold","silk","tea","porcelain"),
("Salt was important in trans-Saharan trade because it was","essential for human consumption","used to build pyramids","a form of currency everywhere","used to make weapons"),
("The ancient city famous as a centre of Islamic learning was","Timbuktu","Lagos","Accra","Ibadan"),
("The Ghana Empire was also known as","Wagadu","Mali","Songhai","Kanem"),
("The Ghana Empire became wealthy mainly through","trans-Saharan trade","industrial production","oil exports","slave plantations only"),
("The Mali Empire rose to prominence after the decline of","Ghana Empire","Roman Empire","Benin Kingdom","Oyo Empire"),
("Mansa Musa was a famous ruler of","Mali","Ghana","Songhai","Benin"),
("Mansa Musa is remembered especially for his","pilgrimage to Mecca and great wealth","invention of printing","conquest of Egypt","discovery of America"),
("Timbuktu flourished under the","Mali and Songhai Empires","Roman Empire","British Empire","Oyo Empire only"),
("The Songhai Empire was centred around","the Niger River region","the Nile Delta","the Congo rainforest","the Cape region"),
("A famous ruler of Songhai was","Askia Muhammad","Mansa Musa","Shaka Zulu","Jaja of Opobo"),
("The Benin Kingdom was famous for its","bronze works","pyramids","silk production","Roman roads"),
("The traditional ruler of Benin is called the","Oba","Emir","Alaafin","Sultan"),
("The Oyo Empire was ruled by the","Alaafin","Oba of Benin","Emir of Kano","Ooni only"),
("The political head of the Oyo Empire was the","Alaafin","Ogboni","Bashorun","Oba"),
("The Hausa states were located mainly in","northern Nigeria","southern Ghana","eastern Congo","coastal Kenya"),
("Kano became important because of","trade and crafts","gold mining only","shipbuilding","European settlement"),
("The Kanem-Bornu Empire was located around","Lake Chad","River Niger Delta","Atlantic Ocean","Lake Victoria"),
("Usman dan Fodio led a major Islamic reform movement in","Hausaland","Benin","Oyo","Gold Coast"),
("The Sokoto Caliphate was established following","the jihad of Usman dan Fodio","the Benin war","the Ashanti wars","the Berlin Conference"),
("The traditional political system of many Igbo communities was","largely decentralized","absolute monarchy","military dictatorship","imperial government"),
("The Igbo village assembly was an important means of","community decision-making","foreign trade only","warfare only","tax collection by kings"),
("The Yoruba city-state of Ile-Ife is traditionally associated with","Yoruba origins","Hausa origins","Ashanti origins","Songhai origins"),
("The Ooni is the traditional ruler of","Ile-Ife","Kano","Benin","Sokoto"),
("The slave trade across the Atlantic involved the movement of Africans to","the Americas","Asia only","Australia only","Antarctica"),
("The triangular trade connected","Europe, Africa and the Americas","Africa, Asia and Australia","Europe, Asia and Antarctica","Nigeria, India and China"),
("European traders obtained enslaved Africans mainly in exchange for","European manufactured goods","modern computers","petroleum","automobiles"),
("The abolition of the trans-Atlantic slave trade occurred gradually during the","19th century","15th century","10th century","21st century"),
("The Berlin Conference of 1884–1885 dealt mainly with","European claims and interests in Africa","the abolition of football","African independence","the creation of the United Nations"),
("The Berlin Conference was associated with the","partition of Africa","formation of ECOWAS","Nigerian independence","end of World War II"),
("Colonialism means","political and economic control of one territory by another power","equal partnership between states","local self-government","free trade only"),
("Nigeria was colonized mainly by","Britain","France","Portugal","Germany"),
("The amalgamation of Northern and Southern Nigeria occurred in","1914","1884","1960","1945"),
("The person associated with the 1914 amalgamation was","Lord Lugard","Lord Macaulay","Nnamdi Azikiwe","Herbert Macaulay"),
("Indirect rule was strongly associated with","Lord Lugard","Mansa Musa","Usman dan Fodio","Shaka Zulu"),
("Indirect rule governed colonies through","traditional rulers","elected presidents only","foreign soldiers only","merchants only"),
("Indirect rule worked more successfully in Northern Nigeria partly because","existing centralized political structures could be used","there were no traditional rulers","the region had no population","British settlers were numerous"),
("Indirect rule faced difficulties in Eastern Nigeria because","the political system was largely decentralized","there were too many kings","the area had no villages","the British had no interest"),
("The educated elite in colonial Nigeria supported","nationalist movements","permanent colonial rule","slave trading","absolute monarchy"),
("Herbert Macaulay is remembered as","a Nigerian nationalist","a British governor","a Ghanaian king","a military ruler"),
("The Nigerian National Democratic Party was founded by","Herbert Macaulay","Nnamdi Azikiwe","Obafemi Awolowo","Ahmadu Bello"),
("Nnamdi Azikiwe was popularly known as","Zik","Awo","Sardauna","Tafawa"),
("Obafemi Awolowo was strongly associated with","Western Region politics","Northern Nigeria only","Benin Kingdom","Ghana Empire"),
("Ahmadu Bello was the","Sardauna of Sokoto","Oba of Benin","Alaafin of Oyo","Ooni of Ife"),
("The Richards Constitution was introduced in","1946","1914","1960","1979"),
("The Macpherson Constitution was introduced in","1951","1946","1963","1999"),
("Nigeria gained independence on","1 October 1960","1 January 1960","15 January 1970","29 May 1999"),
("Nigeria became a republic in","1963","1960","1975","1979"),
("The first Prime Minister of independent Nigeria was","Abubakar Tafawa Balewa","Nnamdi Azikiwe","Obafemi Awolowo","Ahmadu Bello"),
("The first President of Nigeria was","Nnamdi Azikiwe","Tafawa Balewa","Yakubu Gowon","Olusegun Obasanjo"),
("The Nigerian Civil War lasted from","1967 to 1970","1960 to 1963","1975 to 1979","1983 to 1985"),
("The Nigerian Civil War is also known as the","Nigerian-Biafran War","Ashanti War","Sokoto War","Benin War"),
("Biafra was declared by","Chukwuemeka Odumegwu Ojukwu","Yakubu Gowon","Tafawa Balewa","Nnamdi Azikiwe"),
("The Nigerian Civil War ended in","1970","1967","1975","1983"),
("The policy associated with the end of the civil war was","No Victor, No Vanquished","Divide and Rule","Indirect Rule","One Nigeria First"),
("The first military coup in Nigeria occurred in","1966","1960","1970","1975"),
("Major General Aguiyi Ironsi became head of state after the","1966 coup","1975 coup","1983 coup","1993 coup"),
("Yakubu Gowon became military head of state in","1966","1970","1975","1983"),
("Nigeria's Second Republic began in","1979","1960","1966","1999"),
("Shehu Shagari was the president of the","Second Republic","First Republic","Third Republic","Fourth Republic"),
("Nigeria returned to civilian democratic rule in","1999","1993","1983","1979"),
("The Fourth Republic began in","1999","1990","1983","1975"),
("The United Nations was established in","1945","1914","1884","1960"),
("The main purpose of the United Nations is to","promote international peace and cooperation","control African colonies","promote slave trade","replace national governments"),
("The League of Nations was established after","World War I","World War II","the Cold War","the Nigerian Civil War"),
("World War I began in","1914","1939","1945","1900"),
("World War II began in","1939","1914","1945","1960"),
("World War II ended in","1945","1939","1918","1950"),
("The Cold War was mainly a rivalry between","the United States and Soviet Union","Britain and Nigeria","France and Ghana","Germany and Japan only"),
("The Soviet Union was commonly abbreviated as","USSR","USA","UN","EU"),
("The African Union succeeded the","Organization of African Unity","United Nations","ECOWAS","Commonwealth"),
("The Organization of African Unity was founded in","1963","1945","1975","1999"),
("The African Union was launched in","2002","1963","1990","1975"),
("ECOWAS was established to promote","economic cooperation among West African states","military rule in Africa","colonialism","slave trade"),
("ECOWAS was founded in","1975","1963","1945","2002"),
("Apartheid was a system of","racial segregation in South Africa","economic cooperation","democracy","religious tolerance"),
("Nelson Mandela was a major leader in the struggle against","apartheid","colonial rule in Nigeria","the slave trade","the Cold War"),
("South Africa's first black president was","Nelson Mandela","Desmond Tutu","Thabo Mbeki","F. W. de Klerk"),
("Ghana gained independence in","1957","1960","1963","1975"),
("Ghana's independence leader was","Kwame Nkrumah","Jomo Kenyatta","Nelson Mandela","Julius Nyerere"),
("Kenya gained independence in","1963","1957","1960","1975"),
("Jomo Kenyatta was a nationalist leader in","Kenya","Ghana","Nigeria","South Africa"),
("The Commonwealth is an association largely made up of countries with historical links to","the British Empire","the Roman Empire","the Ottoman Empire","the Mali Empire"),
("Nationalism refers to","the desire for self-government and national independence","support for colonialism","military dictatorship","foreign domination"),
("Pan-Africanism promotes","unity and cooperation among Africans and people of African descent","colonial expansion","racial segregation","slave trading"),
("A major effect of colonialism in Africa was","political and economic restructuring by European powers","complete isolation from Europe","end of all trade","elimination of local cultures"),
("Historical evidence should be","critically examined and compared","accepted without question","invented when missing","ignored"),
("Chronology is the arrangement of events","in order of time","according to size","according to location only","alphabetically"),
("A century is a period of","100 years","10 years","50 years","1,000 years"),
("A decade is a period of","10 years","100 years","5 years","1,000 years"),
("The study of family descent is called","genealogy","geography","geology","biology"),
("A dynasty is","a succession of rulers from the same family","a trade route","a military weapon","a religious building"),
("A treaty is","a formal agreement between states or groups","a farm tool","a tax receipt","a religious ceremony"),
]

assert len(qs) >= 100
qs = qs[:100]

questions = []

for i, item in enumerate(qs):
    question, correct, b, c, d = item
    options = [correct, b, c, d]

    shift = i % 4
    options = options[shift:] + options[:shift]

    questions.append({
        "question": question,
        "options": options,
        "answer": options.index(correct)
    })

data["History"] = questions

with open(p, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("History saved:", len(questions))
