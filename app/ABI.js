module.exports=
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "getBalanceAdidasEvent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "investorAddress",
				"type": "address"
			}
		],
		"name": "AdidasPayToInvestor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "contractId",
				"type": "uint256"
			},
			{
				"name": "counterPartyAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "returnPercentage",
				"type": "uint256"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "contractType",
				"type": "string"
			}
		],
		"name": "createContractWithInvestor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "contractId",
				"type": "uint256"
			},
			{
				"name": "counterPartyAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "returnPercentage",
				"type": "uint256"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "contractType",
				"type": "string"
			}
		],
		"name": "createContractWithPlayer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_desc",
				"type": "string"
			},
			{
				"name": "_rec",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "createRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getBalanceAdidas",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "InvestorPayToAdidas",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "PlayerPayToAdidas",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "voteRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "paymentStatus",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "contractStatus",
				"type": "bool"
			}
		],
		"name": "ContractEventStatus",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "adidasAdmin",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allContracts",
		"outputs": [
			{
				"name": "contractId",
				"type": "uint256"
			},
			{
				"name": "counterPartyAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "returnPercentage",
				"type": "uint256"
			},
			{
				"name": "adidasAddress",
				"type": "address"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "contractStatus",
				"type": "bool"
			},
			{
				"name": "paymentStatus",
				"type": "uint8"
			},
			{
				"name": "contractType",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "contractAddress",
				"type": "address"
			}
		],
		"name": "getAllContract",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "Investor",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "InvestorCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "legalContracts",
		"outputs": [
			{
				"name": "contractId",
				"type": "uint256"
			},
			{
				"name": "counterPartyAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "returnPercentage",
				"type": "uint256"
			},
			{
				"name": "adidasAddress",
				"type": "address"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "contractStatus",
				"type": "bool"
			},
			{
				"name": "paymentStatus",
				"type": "uint8"
			},
			{
				"name": "contractType",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listOfContract",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "myAddress",
				"type": "address"
			}
		],
		"name": "myContract",
		"outputs": [
			{
				"name": "contractId",
				"type": "uint256"
			},
			{
				"name": "adidasAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "returnPercentage",
				"type": "uint256"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "paymentStatus",
				"type": "uint8"
			},
			{
				"name": "contractStatus",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "noOfRequest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "requests",
		"outputs": [
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "rec",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "completed",
				"type": "bool"
			},
			{
				"name": "noOfVoters",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "viewVoteRequest",
		"outputs": [
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "rec",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "completed",
				"type": "bool"
			},
			{
				"name": "noOfVoters",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]