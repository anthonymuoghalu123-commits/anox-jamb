import json

p = "data/waec.json"

with open(p, encoding="utf-8") as f:
    data = json.load(f)

qs = [
("A computer is an electronic device that","accepts, processes, stores and outputs data","only stores files","only prints documents","only performs calculations"),
("Raw facts and figures are called","data","information","knowledge","instructions"),
("Processed data that is meaningful is called","information","data","hardware","software"),
("The physical parts of a computer are called","hardware","software","firmware","programs"),
("Programs used to operate a computer are called","software","hardware","cables","circuits"),
("The brain of the computer is the","CPU","monitor","keyboard","printer"),
("CPU stands for","Central Processing Unit","Computer Processing Utility","Central Program Unit","Central Peripheral Unit"),
("The ALU performs","arithmetic and logical operations","printing operations","storage operations only","internet browsing"),
("ALU stands for","Arithmetic Logic Unit","Automatic Logic Utility","Arithmetic Link Unit","Advanced Logic Unit"),
("The control unit is responsible for","directing and coordinating computer operations","printing documents","storing files permanently","displaying pictures"),
("The smallest unit of data is the","bit","byte","kilobyte","megabyte"),
("Eight bits make one","byte","kilobyte","megabyte","word"),
("1024 bytes make one","kilobyte","megabyte","gigabyte","bit"),
("1024 kilobytes make one","megabyte","gigabyte","terabyte","byte"),
("1024 megabytes make one","gigabyte","terabyte","kilobyte","byte"),
("The main memory of a computer includes","RAM and ROM","hard disk and printer","keyboard and mouse","monitor and scanner"),
("RAM stands for","Random Access Memory","Read Access Machine","Random Application Memory","Rapid Access Module"),
("ROM stands for","Read Only Memory","Random Only Memory","Read Open Memory","Rapid Output Memory"),
("RAM is described as","volatile memory","permanent memory","external memory","optical memory"),
("ROM is generally","non-volatile","volatile","temporary","empty"),
("A keyboard is an","input device","output device","storage device","processing device"),
("A mouse is an","input device","output device","storage device","communication device"),
("A monitor is an","output device","input device","storage device","processing device"),
("A printer is an","output device","input device","processing device","storage device"),
("A scanner is used to","capture images and documents into a computer","print documents","store programs","play sounds"),
("A microphone is used to input","sound","pictures","text only","video only"),
("A speaker is an","output device","input device","storage device","processing device"),
("A touchscreen can function as","both input and output device","only storage","only input","only processing"),
("A hard disk is mainly used for","secondary storage","printing","processing","input"),
("A flash drive is a","portable storage device","processing device","display device","network device"),
("A CD is an example of","optical storage","magnetic storage","primary memory","input device"),
("A computer's booting process occurs when","the computer starts up","a document is printed","a file is deleted","the internet disconnects"),
("The operating system is","system software","application software","utility hardware","input hardware"),
("An example of an operating system is","Windows","Microsoft Word","Google Chrome","Adobe Photoshop"),
("Linux is a","operating system","word processor","spreadsheet","database"),
("Android is mainly a","mobile operating system","printer driver","spreadsheet","web browser"),
("Application software is designed to","perform specific user tasks","control electricity","replace hardware","manufacture computers"),
("Microsoft Word is a","word processor","database","spreadsheet","web browser"),
("Microsoft Excel is a","spreadsheet application","word processor","database only","presentation program"),
("Microsoft PowerPoint is used mainly for","presentations","database management","virus scanning","file compression"),
("A database is used to","organize and manage related data","draw pictures only","print receipts only","play music"),
("A collection of related records is called a","file","character","bit","pixel"),
("A collection of related fields is called a","record","file","byte","program"),
("A field is","a single item of data in a record","a collection of files","a computer screen","a software package"),
("A primary key is used to","uniquely identify a record","delete every record","print a database","connect a monitor"),
("A computer virus is","a harmful program that can replicate","a hardware component","a type of printer","an operating system"),
("Antivirus software is used to","detect and remove malware","increase screen size","create keyboards","connect cables"),
("Malware means","malicious software","manual hardware","managed language","memory hardware"),
("A firewall helps to","control network traffic and improve security","print documents","increase RAM physically","repair keyboards"),
("A password is used to","protect access to information or systems","increase storage","print files","speed up the CPU"),
("A strong password should generally be","difficult for others to guess","your name only","123456","password"),
("Phishing is an attempt to","trick users into revealing sensitive information","repair computers","increase internet speed","install printers"),
("Spam refers to","unwanted electronic messages","computer hardware","system software","encrypted files"),
("The internet is","a global network of interconnected computers","a single computer","a printer network only","a word processor"),
("WWW stands for","World Wide Web","World Wireless Window","Web Wide World","Wireless Web Work"),
("A website is a collection of","web pages","computer processors","printers","hard disks"),
("A web browser is used to","access websites","create electricity","repair hardware","format hard disks"),
("An example of a web browser is","Google Chrome","Microsoft Excel","Windows","Adobe Acrobat"),
("A search engine helps users to","find information on the internet","print documents","edit videos","format disks"),
("An example of a search engine is","Google","Windows","Excel","PowerPoint"),
("URL stands for","Uniform Resource Locator","Universal Record Link","United Resource Language","Uniform Routing Line"),
("HTTP is a protocol used for","transferring web resources","printing documents","formatting disks","processing images"),
("HTTPS provides","secure communication over the web","faster typing","more RAM","larger storage"),
("Email means","electronic mail","electronic memory","encoded machine","external mail"),
("An email attachment is","a file sent with an email","a password","a web browser","a network cable"),
("LAN stands for","Local Area Network","Large Access Network","Long Area Node","Local Application Network"),
("WAN stands for","Wide Area Network","Wireless Access Node","Web Area Network","Wide Application Network"),
("A network connecting computers within a small area is a","LAN","WAN","MAN","PAN"),
("A device that connects different networks is a","router","keyboard","monitor","scanner"),
("A modem is used to","facilitate communication with an internet service","print documents","store files","display images"),
("Wi-Fi is a technology for","wireless networking","printing only","data storage","video editing"),
("Bluetooth is mainly used for","short-range wireless communication","long-distance satellite communication","printing newspapers","creating websites"),
("An IP address identifies","a device on a network","a keyboard key","a file type","a printer cartridge"),
("A computer network allows computers to","share resources and information","operate without software","avoid all security risks","replace processors"),
("Data transmission means","sending data from one location to another","deleting files","printing documents","formatting disks"),
("Full-duplex communication allows","simultaneous two-way communication","one-way communication only","no communication","delayed communication only"),
("A protocol is","a set of rules for communication","a storage device","a computer screen","a programming language only"),
("Binary uses the digits","0 and 1","1 and 2","0 to 9","2 and 3"),
("The decimal number system has","10 digits","2 digits","8 digits","16 digits"),
("The binary equivalent of decimal 2 is","10","11","01","100"),
("The binary equivalent of decimal 5 is","101","100","110","111"),
("A programming language is used to","write instructions for computers","clean hardware","increase electricity","store paper files"),
("Python is a","programming language","database","printer","web browser"),
("HTML is mainly used to","structure web pages","calculate spreadsheets","scan viruses","manage electricity"),
("CSS is mainly used to","style web pages","store databases","process sound","protect passwords"),
("JavaScript is commonly used to","add interactivity to web pages","print books","repair hardware","format disks"),
("An algorithm is","a step-by-step procedure for solving a problem","a computer virus","a storage device","a network cable"),
("A flowchart represents an algorithm using","symbols and diagrams","only paragraphs","only numbers","hardware components"),
("The flowchart symbol for a decision is usually a","diamond","rectangle","circle","triangle"),
("The flowchart symbol for a process is usually a","rectangle","diamond","oval","circle"),
("The flowchart symbol for start or end is usually an","oval","rectangle","diamond","arrow"),
("A compiler translates","high-level language into machine code","images into text","sound into video","hardware into software"),
("An interpreter translates and executes","program instructions line by line","only images","only hardware","network cables"),
("Machine language consists of","binary instructions","English sentences","pictures","spreadsheets"),
("A high-level programming language is designed to be","easier for humans to understand","impossible to read","only binary","hardware-based"),
("A computer file extension identifies","the type of file","the owner only","the password","the computer model"),
("The extension .docx is associated with","Microsoft Word documents","images","audio","videos"),
("The extension .xlsx is associated with","Microsoft Excel workbooks","Word documents","audio files","web pages"),
("The extension .jpg is commonly used for","images","documents","programs","spreadsheets"),
("The extension .mp3 is commonly used for","audio","images","documents","databases"),
("Backup means","making a copy of data for recovery","deleting data","sharing passwords","formatting a computer"),
("Cloud storage allows users to","store data on remote servers","store only paper documents","increase CPU speed","repair keyboards"),
("Computer ethics refers to","responsible and acceptable use of computers","computer manufacturing","hardware repair","program installation"),
("Copyright protects","original creative works","computer electricity","network cables","RAM chips"),
("Cybersecurity is concerned with","protecting systems and data from threats","printing documents","writing essays","playing games"),
("Two-factor authentication improves security by","requiring two forms of verification","removing passwords","sharing passwords","disabling accounts"),
("Data privacy involves","protecting personal information","publishing all information","deleting every file","sharing passwords"),
("Ergonomics in computing aims to","make computer use safer and more comfortable","increase viruses","reduce storage","remove software"),
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

data["Computer Studies"] = questions

with open(p, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Computer Studies saved:", len(questions))
