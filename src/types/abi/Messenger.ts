/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface MessengerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "authorizeMessenger"
      | "callSvc"
      | "callSvcBtpAddr"
      | "getXCallFee"
      | "handleCallMessage"
      | "initialize"
      | "messengersNID"
      | "networkID"
      | "owner"
      | "receivedMessages"
      | "renounceOwnership"
      | "revokeMessenger"
      | "sendArbitraryCall"
      | "sendMessage"
      | "sentMessages"
      | "sentMessagesCount"
      | "setCallServiceAdress"
      | "testXCall"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Initialized"
      | "MessageReceived"
      | "MessageSent"
      | "OwnershipTransferred"
      | "RollbackDataReceived"
      | "TextMessageReceived"
      | "TextMessageSent"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "authorizeMessenger",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "callSvc", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "callSvcBtpAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getXCallFee",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "handleCallMessage",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "messengersNID",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "networkID", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "receivedMessages",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeMessenger",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "sendArbitraryCall",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "sentMessages",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "sentMessagesCount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setCallServiceAdress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "testXCall",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeMessenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "callSvc", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "callSvcBtpAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getXCallFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleCallMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "messengersNID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "networkID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "receivedMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeMessenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendArbitraryCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sentMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sentMessagesCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCallServiceAdress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "testXCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MessageReceivedEvent {
  export type InputTuple = [_from: string, _data: BytesLike];
  export type OutputTuple = [_from: string, _data: string];
  export interface OutputObject {
    _from: string;
    _data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MessageSentEvent {
  export type InputTuple = [
    _from: AddressLike,
    _messageId: BigNumberish,
    _data: BytesLike
  ];
  export type OutputTuple = [_from: string, _messageId: bigint, _data: string];
  export interface OutputObject {
    _from: string;
    _messageId: bigint;
    _data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RollbackDataReceivedEvent {
  export type InputTuple = [_from: string, _data: BytesLike];
  export type OutputTuple = [_from: string, _data: string];
  export interface OutputObject {
    _from: string;
    _data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TextMessageReceivedEvent {
  export type InputTuple = [_from: string, _messageID: string];
  export type OutputTuple = [_from: string, _messageID: string];
  export interface OutputObject {
    _from: string;
    _messageID: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TextMessageSentEvent {
  export type InputTuple = [_from: AddressLike, _messageID: string];
  export type OutputTuple = [_from: string, _messageID: string];
  export interface OutputObject {
    _from: string;
    _messageID: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Messenger extends BaseContract {
  connect(runner?: ContractRunner | null): Messenger;
  waitForDeployment(): Promise<this>;

  interface: MessengerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  authorizeMessenger: TypedContractMethod<
    [_BTPaddress: string],
    [void],
    "nonpayable"
  >;

  callSvc: TypedContractMethod<[], [string], "view">;

  callSvcBtpAddr: TypedContractMethod<[], [string], "view">;

  getXCallFee: TypedContractMethod<
    [_to: string, _useCallback: boolean],
    [bigint],
    "view"
  >;

  handleCallMessage: TypedContractMethod<
    [_from: string, _data: BytesLike],
    [void],
    "nonpayable"
  >;

  initialize: TypedContractMethod<
    [_callServiceAddress: AddressLike, _networkID: string],
    [void],
    "nonpayable"
  >;

  messengersNID: TypedContractMethod<[arg0: string], [string], "view">;

  networkID: TypedContractMethod<[], [string], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  receivedMessages: TypedContractMethod<[arg0: string], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  revokeMessenger: TypedContractMethod<
    [_BTPaddress: string],
    [void],
    "nonpayable"
  >;

  sendArbitraryCall: TypedContractMethod<
    [_to: string, _data: BytesLike],
    [void],
    "payable"
  >;

  sendMessage: TypedContractMethod<
    [_to: string, _message: string],
    [void],
    "payable"
  >;

  sentMessages: TypedContractMethod<[arg0: string], [string], "view">;

  sentMessagesCount: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  setCallServiceAdress: TypedContractMethod<
    [_callServiceAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  testXCall: TypedContractMethod<
    [_from: string, _data: BytesLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "authorizeMessenger"
  ): TypedContractMethod<[_BTPaddress: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "callSvc"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "callSvcBtpAddr"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getXCallFee"
  ): TypedContractMethod<
    [_to: string, _useCallback: boolean],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "handleCallMessage"
  ): TypedContractMethod<
    [_from: string, _data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [_callServiceAddress: AddressLike, _networkID: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "messengersNID"
  ): TypedContractMethod<[arg0: string], [string], "view">;
  getFunction(
    nameOrSignature: "networkID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "receivedMessages"
  ): TypedContractMethod<[arg0: string], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "revokeMessenger"
  ): TypedContractMethod<[_BTPaddress: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "sendArbitraryCall"
  ): TypedContractMethod<[_to: string, _data: BytesLike], [void], "payable">;
  getFunction(
    nameOrSignature: "sendMessage"
  ): TypedContractMethod<[_to: string, _message: string], [void], "payable">;
  getFunction(
    nameOrSignature: "sentMessages"
  ): TypedContractMethod<[arg0: string], [string], "view">;
  getFunction(
    nameOrSignature: "sentMessagesCount"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "setCallServiceAdress"
  ): TypedContractMethod<
    [_callServiceAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "testXCall"
  ): TypedContractMethod<
    [_from: string, _data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "MessageReceived"
  ): TypedContractEvent<
    MessageReceivedEvent.InputTuple,
    MessageReceivedEvent.OutputTuple,
    MessageReceivedEvent.OutputObject
  >;
  getEvent(
    key: "MessageSent"
  ): TypedContractEvent<
    MessageSentEvent.InputTuple,
    MessageSentEvent.OutputTuple,
    MessageSentEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "RollbackDataReceived"
  ): TypedContractEvent<
    RollbackDataReceivedEvent.InputTuple,
    RollbackDataReceivedEvent.OutputTuple,
    RollbackDataReceivedEvent.OutputObject
  >;
  getEvent(
    key: "TextMessageReceived"
  ): TypedContractEvent<
    TextMessageReceivedEvent.InputTuple,
    TextMessageReceivedEvent.OutputTuple,
    TextMessageReceivedEvent.OutputObject
  >;
  getEvent(
    key: "TextMessageSent"
  ): TypedContractEvent<
    TextMessageSentEvent.InputTuple,
    TextMessageSentEvent.OutputTuple,
    TextMessageSentEvent.OutputObject
  >;

  filters: {
    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "MessageReceived(string,bytes)": TypedContractEvent<
      MessageReceivedEvent.InputTuple,
      MessageReceivedEvent.OutputTuple,
      MessageReceivedEvent.OutputObject
    >;
    MessageReceived: TypedContractEvent<
      MessageReceivedEvent.InputTuple,
      MessageReceivedEvent.OutputTuple,
      MessageReceivedEvent.OutputObject
    >;

    "MessageSent(address,uint256,bytes)": TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;
    MessageSent: TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "RollbackDataReceived(string,bytes)": TypedContractEvent<
      RollbackDataReceivedEvent.InputTuple,
      RollbackDataReceivedEvent.OutputTuple,
      RollbackDataReceivedEvent.OutputObject
    >;
    RollbackDataReceived: TypedContractEvent<
      RollbackDataReceivedEvent.InputTuple,
      RollbackDataReceivedEvent.OutputTuple,
      RollbackDataReceivedEvent.OutputObject
    >;

    "TextMessageReceived(string,string)": TypedContractEvent<
      TextMessageReceivedEvent.InputTuple,
      TextMessageReceivedEvent.OutputTuple,
      TextMessageReceivedEvent.OutputObject
    >;
    TextMessageReceived: TypedContractEvent<
      TextMessageReceivedEvent.InputTuple,
      TextMessageReceivedEvent.OutputTuple,
      TextMessageReceivedEvent.OutputObject
    >;

    "TextMessageSent(address,string)": TypedContractEvent<
      TextMessageSentEvent.InputTuple,
      TextMessageSentEvent.OutputTuple,
      TextMessageSentEvent.OutputObject
    >;
    TextMessageSent: TypedContractEvent<
      TextMessageSentEvent.InputTuple,
      TextMessageSentEvent.OutputTuple,
      TextMessageSentEvent.OutputObject
    >;
  };
}
