import json

p = "data/waec.json"

with open(p, encoding="utf-8") as f:
    data = json.load(f)

qs = [
("The main purpose of accounting is to","record and communicate financial information","produce goods","advertise products","transport goods"),
("Bookkeeping is mainly concerned with","recording financial transactions","interpreting laws","producing goods","selling shares"),
("The accounting equation is","Assets = Capital + Liabilities","Assets = Capital - Liabilities","Capital = Assets + Liabilities","Liabilities = Assets + Capital"),
("An asset is a resource","owned or controlled by a business","owed by a business","paid to workers","used only by customers"),
("A liability is an amount","owed by a business","owned by a business","earned by customers","paid as wages"),
("Capital represents the owner's","investment in the business","expenses","sales","debts"),
("Drawings are","cash or goods withdrawn by the owner for personal use","business expenses","sales returns","purchases"),
("Revenue is income earned from","normal business activities","borrowing only","drawings","purchasing assets"),
("An expense is a cost incurred in","earning revenue","buying shares only","receiving capital","collecting debts"),
("A debtor is a person who","owes the business money","is owed money by the business","owns the business","audits the business"),
("A creditor is a person to whom","the business owes money","customers owe money","the owner sells goods","the bank gives money"),
("Goods bought for resale are called","purchases","sales","capital","drawings"),
("Goods sold by a business are called","sales","purchases","capital","liabilities"),
("A credit sale is recorded from the","sales invoice","receipt","cheque","bank statement"),
("A receipt is evidence of","payment","credit purchase","quotation","order"),
("A cheque is a written instruction to","a bank to pay money","a customer to buy goods","a supplier to deliver goods","an auditor to inspect books"),
("The cash book records","cash and bank transactions","only credit sales","only credit purchases","only assets"),
("The journal is also called the","book of original entry","book of final accounts","balance sheet","cash book"),
("The ledger contains","accounts of individual items and persons","only invoices","only receipts","only bank statements"),
("The left side of an account is the","debit side","credit side","balance side","capital side"),
("The right side of an account is the","credit side","debit side","balance side","asset side"),
("The rule for personal accounts is","debit the receiver and credit the giver","debit the giver and credit the receiver","debit expenses and credit assets","credit expenses and debit income"),
("The rule for real accounts is","debit what comes in and credit what goes out","debit the giver","credit expenses","debit income"),
("The rule for nominal accounts is","debit expenses and losses and credit incomes and gains","debit the giver","credit expenses","debit assets only"),
("A trial balance is prepared to","test the arithmetical accuracy of ledger entries","calculate sales only","record transactions","prepare invoices"),
("A trial balance contains","debit and credit balances","only assets","only liabilities","only expenses"),
("A suspense account may be opened when","the trial balance does not agree","there are no transactions","profit is high","capital is zero"),
("An error of omission occurs when","a transaction is completely left out","an amount is entered twice","a wrong account is used","figures are reversed"),
("An error of commission occurs when","the correct class of account is used incorrectly","a transaction is omitted","capital is overstated","cash is stolen"),
("An error of principle occurs when","a transaction violates an accounting principle","a transaction is omitted","cash is counted twice","a cheque is dishonoured"),
("A compensating error occurs when","two or more errors cancel each other","one transaction is omitted","a wrong account is used","cash is stolen"),
("A bank reconciliation statement explains differences between","the cash book and bank statement","sales and purchases","assets and liabilities","capital and drawings"),
("An unpresented cheque is a cheque","issued but not yet presented to the bank","received but never recorded","cancelled by the bank","paid in cash"),
("A dishonoured cheque is one that","the bank refuses to pay","has already been paid","is never issued","is deposited successfully"),
("A bank charge is an amount","charged by the bank for its services","paid to customers","received from debtors","owed by suppliers"),
("Petty cash is used for","small everyday expenses","large purchases","long-term loans","capital expenditure only"),
("The imprest system involves","restoring petty cash to a fixed amount","doubling petty cash","closing the cash book","avoiding receipts"),
("A cash discount encourages","prompt payment","late payment","credit purchases only","higher expenses"),
("Trade discount is a reduction in","the list price of goods","cash balance","capital","bank charges"),
("Returns inward means","goods returned by customers","goods returned to suppliers","cash returned to owners","bank refunds"),
("Returns outward means","goods returned to suppliers","goods returned by customers","cash withdrawn","sales made on credit"),
("Carriage inward is the cost of","bringing purchased goods into the business","delivering goods to customers","advertising","office administration"),
("Carriage outward is the cost of","delivering goods to customers","bringing goods from suppliers","purchasing machinery","paying creditors"),
("The trading account determines","gross profit or gross loss","net profit only","capital","cash balance"),
("Gross profit is calculated as","sales minus cost of goods sold","sales minus all expenses","capital minus drawings","assets minus liabilities"),
("Gross loss occurs when","cost of goods sold exceeds sales","sales exceed cost of sales","expenses are zero","capital increases"),
("The profit and loss account determines","net profit or net loss","gross profit only","cash balance","bank balance"),
("Net profit is generally","gross profit plus other income minus expenses","sales minus purchases only","assets minus liabilities","capital plus drawings"),
("A balance sheet shows","the financial position of a business","daily sales only","cash transactions only","production levels"),
("Working capital is","current assets minus current liabilities","fixed assets minus capital","sales minus purchases","capital minus drawings"),
("Stock is another name for","inventory","capital","liability","expense"),
("Opening stock is stock","available at the beginning of the period","available at the end only","purchased after closing","sold during the year"),
("Closing stock is stock","remaining at the end of the period","available at the beginning only","already sold","destroyed"),
("Depreciation means","a decrease in the value of a fixed asset","an increase in cash","an increase in capital","purchase of stock"),
("One cause of depreciation is","wear and tear","increase in sales","capital introduction","cash discount"),
("Straight-line depreciation charges","equal amounts each year","increasing amounts each year","no depreciation","random amounts"),
("Reducing-balance depreciation is based on","the reducing book value of an asset","original sales","capital only","cash balance"),
("A fixed asset is acquired mainly for","long-term use in the business","immediate resale","personal consumption","short-term trading"),
("Examples of fixed assets include","machinery and buildings","stock and debtors","cash and bank","creditors and loans"),
("Bad debts are amounts","owed but considered irrecoverable","paid in advance","received from customers","invested in shares"),
("A provision for doubtful debts is made because","some debts may not be collected","all debts are paid immediately","sales are increasing","cash is excessive"),
("Capital expenditure is expenditure on","acquiring or improving long-term assets","daily running expenses","stationery only","wages only"),
("Revenue expenditure is expenditure on","day-to-day operations","buying land only","buying buildings only","acquiring shares"),
("Prime cost consists of","direct materials, direct labour and direct expenses","rent, rates and insurance","sales and purchases","cash and bank"),
("Factory overheads are","indirect costs of production","direct materials","direct wages","sales revenue"),
("Cost of production includes","prime cost plus factory overheads","sales minus expenses","capital plus drawings","cash plus bank"),
("A partnership is owned by","two or more persons","one person only","government only","customers"),
("The agreement between partners is called","partnership deed","invoice","receipt","prospectus"),
("A partnership appropriation account shows","distribution of partnership profit","cash transactions","sales only","purchases only"),
("Goodwill represents","the value of a firm's reputation and customer loyalty","cash in hand","stock","creditors"),
("A company is a","separate legal entity","sole trader","department of a bank","government ministry"),
("Share capital is","money raised by issuing shares","money borrowed from suppliers","cash sales","trade discount"),
("Preference shareholders usually have","preferential rights to dividends","no rights at all","unlimited liability","control of every transaction"),
("Ordinary shareholders usually receive","dividends after preference shareholders","fixed interest","bank charges","wages"),
("A debenture represents","long-term borrowed capital","ordinary shares","cash sales","stock"),
("An auditor is responsible for","examining financial statements and records","selling goods","producing goods","collecting all debts"),
("Auditing involves","independent examination of accounting records","recording purchases only","selling shares","preparing invoices only"),
("The statement showing financial position is the","statement of financial position","cash book","sales journal","trading account"),
("The statement showing business performance is the","income statement","balance sheet","cash book","purchase journal"),
("Accounting information should be","reliable and relevant","inaccurate","deliberately confusing","always hidden"),
("The going concern concept assumes that a business","will continue operating for the foreseeable future","will close immediately","has no liabilities","cannot make profit"),
("The consistency concept requires","similar accounting methods to be used consistently","methods to change every month","all expenses to be ignored","assets to be sold"),
("The prudence concept encourages accountants to","avoid overstating profits and assets","overstate profits","ignore liabilities","hide expenses"),
("The accrual concept records income and expenses","when earned or incurred","only when cash changes hands","only at year end","only when approved by a bank"),
("The business entity concept treats the business as","separate from its owner","identical to its owner","part of the government","a customer"),
("The money measurement concept records transactions that","can be measured in monetary terms","cannot be measured","are personal only","are emotional"),
("The dual aspect concept means every transaction","has two accounting effects","has no effect","has one effect only","must involve cash"),
("The accounting period concept divides business life into","specific reporting periods","one permanent period","daily transactions only","monthly purchases only"),
("A source document provides","evidence of a transaction","business capital","insurance cover","market demand"),
("An invoice is normally prepared by","the seller","the buyer only","the bank","the auditor"),
("A receipt is normally issued by","the person receiving payment","the person making payment only","the auditor","the government"),
("A ledger account is used to","classify transactions under appropriate headings","advertise goods","transport goods","insure property"),
("A balance brought down is","the balance carried into the next accounting period","a new expense","a sales invoice","a bank charge"),
("Final accounts are prepared mainly to","determine performance and financial position","record every transaction","advertise products","hire employees"),
("A debtor's account normally has a","debit balance","credit balance","zero balance","capital balance"),
("A creditor's account normally has a","credit balance","debit balance","cash balance","sales balance"),
("A bank overdraft is","a facility allowing withdrawal beyond the bank balance","a type of asset","a cash discount","a trade discount"),
("A cash book with cash and bank columns records","cash and bank transactions","credit transactions only","assets only","liabilities only"),
("The excess of assets over liabilities represents","capital or owner's equity","sales","expenses","drawings"),
("If assets are ₦80,000 and liabilities are ₦30,000, capital is","₦50,000","₦110,000","₦30,000","₦80,000"),
("If capital is ₦60,000 and liabilities are ₦20,000, assets are","₦80,000","₦40,000","₦60,000","₦20,000"),
("The person who receives a cheque payment is the","payee","drawer","drawee","endorser"),
("The person who writes a cheque is the","drawer","payee","drawee","banker"),
("The bank on which a cheque is drawn is the","drawee","drawer","payee","endorser"),
]

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

data["Accounting"] = questions

with open(p, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Accounting saved:", len(questions))
