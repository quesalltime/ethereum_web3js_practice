pragma solidity ^0.4.4;

contract SimpleContract {

    uint public value;

    event logValue(uint value_);
    event logValue2(string valueString);

    function setValue(uint value_) public {
        value = value_;
    }

    function setValue2(uint value_, string str_) public {
        logValue2(str_);
        value = value_;
    }

}