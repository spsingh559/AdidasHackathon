 pragma solidity ^0.4.24;
// pragma experimental ABIEncoderV2;/
contract sportFunda{
    
    enum State {InvestorPaidToAdidas, AdidasPaymentPendingWithInvestor,AdidasPaidReturnToInvestor,AdidasPaidToPlayer,PlayerPaidReturnToAdidas,PlayerPaymentPendingWithAdidas}
    // State public PaymentStateStatus;
    struct legalContract{ //contract structure
        uint contractId;
        address counterPartyAddress;
        uint amount;
        uint returnPercentage;
        address adidasAddress;
        uint duration;
        bool contractStatus;
        State paymentStatus;
        string contractType;
    }
    
    address public adidasAdmin;
    mapping(address=>legalContract) public legalContracts;
    legalContract[] public allContracts;
    mapping(address => uint[]) public listOfContract;
    
    // voting Mechanism
    mapping(address => uint) public Investor;
    uint public InvestorCount=0;
    
     struct Request{
     string desc;
     address rec;
     uint value;
     bool completed;
     uint noOfVoters;
     mapping(address => bool) voters; //check the status of contributor votes
 }
 
 Request[] public requests; //list of struct
   
    constructor () public {
        adidasAdmin=msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender==adidasAdmin);
        _;
    }
    
    event ContractEventStatus(State paymentStatus,bool contractStatus);
    
    function createContractWithInvestor (uint contractId,address counterPartyAddress,uint amount,uint returnPercentage,uint duration,string contractType ) public onlyAdmin{
     legalContract memory newLegalContract = legalContract({
         contractId:contractId,
        counterPartyAddress:counterPartyAddress,
        amount:amount,
        returnPercentage:returnPercentage,
        adidasAddress:address(this),
        duration:duration,
        contractStatus:true,
        paymentStatus:State.AdidasPaymentPendingWithInvestor,
        contractType:contractType
     });
     
     allContracts.push(newLegalContract);
    legalContracts[counterPartyAddress]=newLegalContract;
    listOfContract[counterPartyAddress].push(allContracts.length-1);
    }
    
     function createContractWithPlayer (uint contractId,address counterPartyAddress,uint amount,uint returnPercentage,uint duration,string contractType ) public onlyAdmin{
      legalContract memory newLegalContract = legalContract({
         contractId:contractId,
        counterPartyAddress:counterPartyAddress,
        amount:amount,
        returnPercentage:returnPercentage,
        adidasAddress:address(this),
        duration:duration,
        contractStatus:true,
        paymentStatus:State.AdidasPaidToPlayer,
        contractType:contractType
     });
     
     allContracts.push(newLegalContract);
    legalContracts[counterPartyAddress]=newLegalContract;
    // counterPartyAddress.transfer(amount);
    listOfContract[counterPartyAddress].push(allContracts.length-1);
    }
    
    modifier notAdmin() {
        require(msg.sender!=adidasAdmin);
        _;
    }
    
    function InvestorPayToAdidas() public payable notAdmin{
        
         legalContract memory InvestorPayToAdidasContract=legalContracts[msg.sender];
        //  require(msg.value==InvestorPayToAdidasContract.amount);
         InvestorPayToAdidasContract.adidasAddress.transfer(InvestorPayToAdidasContract.amount);
         legalContracts[msg.sender].paymentStatus=State.InvestorPaidToAdidas;
        //  InvestorPayToAdidasContract.paymentStatus=State.InvestorPaidToAdidas;
        allContracts.push(InvestorPayToAdidasContract);
        listOfContract[msg.sender].push(allContracts.length-1);
        Investor[msg.sender]=InvestorPayToAdidasContract.amount;
        InvestorCount++;
         emit ContractEventStatus(InvestorPayToAdidasContract.paymentStatus,InvestorPayToAdidasContract.contractStatus);
    }
    
    event getBalanceAdidasEvent(uint value);
    function getBalanceAdidas() public returns (uint){
        emit getBalanceAdidasEvent(address(this).balance);
        return address(this).balance;
    }
    
    function () public payable{
        
    }
    
    function PlayerPayToAdidas() public payable{
        legalContract memory PlayerPayToAdidasContract=legalContracts[msg.sender];
         PlayerPayToAdidasContract.adidasAddress.transfer(msg.value);
         legalContracts[msg.sender].paymentStatus=State.PlayerPaidReturnToAdidas;
         legalContracts[msg.sender].contractStatus=false;
        //  PlayerPayToAdidasContract.paymentStatus=State.PlayerPaidReturnToAdidas;
        //  PlayerPayToAdidasContract.contractStatus=false;
        allContracts.push(PlayerPayToAdidasContract);
        listOfContract[msg.sender].push(allContracts.length-1);
         emit ContractEventStatus(PlayerPayToAdidasContract.paymentStatus,PlayerPayToAdidasContract.contractStatus);
    }
    
     function AdidasPayToInvestor(address investorAddress) public {
        legalContract memory AdidasPayToInvestorContract=legalContracts[investorAddress];
        
         AdidasPayToInvestorContract.counterPartyAddress.transfer(AdidasPayToInvestorContract.amount+(AdidasPayToInvestorContract.amount*AdidasPayToInvestorContract.returnPercentage)/100);
          legalContracts[investorAddress].paymentStatus=State.AdidasPaidReturnToInvestor;
         legalContracts[investorAddress].contractStatus=false;
        //  AdidasPayToInvestorContract.paymentStatus=State.AdidasPaidReturnToInvestor;
        //  AdidasPayToInvestorContract.contractStatus=false;
          allContracts.push(AdidasPayToInvestorContract);
        listOfContract[investorAddress].push(allContracts.length-1);
         emit ContractEventStatus(AdidasPayToInvestorContract.paymentStatus,AdidasPayToInvestorContract.contractStatus);
    }
    
    function getAllContract(address contractAddress) public view returns(uint){
        return listOfContract[contractAddress].length;
    }
    
    function myContract(address myAddress) public view returns(uint contractId, address adidasAddress, uint amount, uint returnPercentage, uint duration, State paymentStatus, bool contractStatus) {
        legalContract memory lg=legalContracts[myAddress];
     return(lg.contractId, lg.adidasAddress, lg.amount,lg.returnPercentage,lg.duration,lg.paymentStatus,lg.contractStatus);   
    }
 
    
 
 function createRequest(string _desc, address _rec,uint _value) public{
     Request memory newRequest =Request({
         desc:_desc,
         rec:_rec,
         value:_value,
         completed:false,
         noOfVoters:0
     });
     requests.push(newRequest);
 }
 
 function voteRequest(uint index) public {
     Request memory thisRequest=requests[index];
     requests[index].voters[msg.sender]=true;
     requests[index].noOfVoters++;
    //  uint i=0;
     
     if(requests[index].noOfVoters >= InvestorCount/2){
         requests[index].completed=true;
      thisRequest.rec.transfer(thisRequest.value);
     }
 }
 
 function viewVoteRequest(uint index) view public returns(string desc, address rec, uint value,bool completed,
         uint noOfVoters){
             Request memory thisRequest=requests[index];
             return(thisRequest.desc, thisRequest.rec, thisRequest.value, thisRequest.completed,
          thisRequest.noOfVoters);
         }
 
 function noOfRequest() view public returns(uint){
     return requests.length;
 }
 

    
}