import React, { useState, useRef, useEffect } from "react";
import dollarSign from "./assets/images/dollar.svg";
import personSign from "./assets/images/person.svg";

const Splitter = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [isCustomTipSelected, setIsCustomTipSelected] = useState(false);
  const [numberOfPeopleError, setNumberOfPeopleError] = useState("");

  const numberOfPeopleInputRef = useRef(null);
  useEffect(() => {
    if (numberOfPeopleError) {
      numberOfPeopleInputRef.current.focus();
    }
  }, [numberOfPeopleError]);
  const handleBillAmountChange = (event) => {
    const value = event.target.value;
    if (event.target.value === "" || !isNaN(value)) {
      setBillAmount(value);
      validateNumberOfPeople(value, tipPercentage);
    }
  };

  const handleTipPercentageChange = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setIsCustomTipSelected(true);
      setTipPercentage("");
    } else {
      setIsCustomTipSelected(false);
      setTipPercentage(value);
    }
    validateNumberOfPeople(billAmount, value);
  };

  const handleCustomTipChange = (event) => {
    setCustomTip(event.target.value);
    setTipPercentage(event.target.value);
    validateNumberOfPeople(billAmount, event.target.value);
  };

  const handleNumberOfPeopleChange = (event) => {
    const value = event.target.value;
    if (event.target.value === "" || !isNaN(value)) {
      setNumberOfPeople(value);
      setNumberOfPeopleError("");
    } else {
      setNumberOfPeopleError("Can,t be zero");
    }
  };

  const validateNumberOfPeople = (billValue, tipValue) => {
    if (
      billValue !== "" &&
      tipValue !== "" &&
      (numberOfPeople === "" || numberOfPeople === "0")
    ) {
      setNumberOfPeopleError("Can,t be zero");
    } else {
      setNumberOfPeopleError("");
    }
  };

  const calculateTipAmount = () => {
    if (tipPercentage === "0" || numberOfPeople === "0") {
      setNumberOfPeopleError("Can,t be zero");
      return 0;
    }
    return (
      (parseFloat(billAmount) * (parseFloat(tipPercentage) / 100)) /
        parseFloat(numberOfPeople) || 0
    );
  };

  const calculateTotalPerPerson = () => {
    if (numberOfPeople === "0") {
      setNumberOfPeopleError("Can,t be zero");
      return 0;
    }
    return (
      (parseFloat(billAmount) + calculateTipAmount()) /
        parseFloat(numberOfPeople) || 0
    );
  };

  const resetCalculator = () => {
    setBillAmount("");
    setTipPercentage("");
    setNumberOfPeople("");
    setCustomTip("");
    setIsCustomTipSelected(false);
    setNumberOfPeopleError("");
  };

  return (
    <div className="ibm bg-[#C5E4E7] w-full h-auto sm:min-h-[100vh] py-[20px] sm:py-[50px]">
      <div className="container">
        <h1 className="text-[30px] sm:text-[40px] uppercase font-semibold leading-[40px] sm:leading-[50px] tracking-[0.2em] text-center text-[#406667]">
          Splt <br /> tter
        </h1>
        <div className="h-auto sm:h-[587px] flex flex-col sm:flex-row items-center gap-[50px] rounded-[15px] bg-[#fff] p-[20px] lg:p-[50px] mt-[20px] sm:mt-[50px]">
          <div className="sm:basis-[50%]">
            <label className="text-[#6B7777] text-xl font-medium leading-[30px] tracking-normal relative">
              Bill
              <img
                src={dollarSign}
                alt="$"
                className="absolute bottom-[4px] left-[15px]"
              />
              <input
                type="text"
                value={billAmount}
                onChange={handleBillAmountChange}
                placeholder="0"
                className="w-full h-[55px] mt-1 bg-[#F3F8FB] rounded-[10px] outline-none focus:ring focus:ring-[#26C2AD] text-right text-[22px] font-semibold leading-5 text-[#00474B] pr-[15px]"
              />
            </label>
            <label className="text-xl font-semibold text-[#6B7777] inline-block my-[20px] sm:my-[30px]">
              Select Tip %
            </label>
            <div className="tip-buttons grid grid-cols-2 2sm:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                className={`text-[20px] sm:text-2xl font-semibold max-w-[300.88px] h-[52px] rounded-[10px] ${
                  tipPercentage === "5"
                    ? "bg-[#9FE8DD] text-[#00474B]"
                    : "bg-[#00474B] text-[#fff]"
                }`}
                onClick={() =>
                  handleTipPercentageChange({ target: { value: "5" } })
                }
              >
                5%
              </button>

              <button
                className={`text-[20px] sm:text-2xl font-semibold max-w-[300.88px] h-[52px] rounded-[10px] ${
                  tipPercentage === "10"
                    ? "bg-[#9FE8DD] text-[#00474B]"
                    : "bg-[#00474B] text-[#fff]"
                }`}
                onClick={() =>
                  handleTipPercentageChange({ target: { value: "10" } })
                }
              >
                10%
              </button>
              <button
                className={`text-[20px] sm:text-2xl font-semibold max-w-[300.88px] h-[52px] rounded-[10px] ${
                  tipPercentage === "15"
                    ? "bg-[#9FE8DD] text-[#00474B]"
                    : "bg-[#00474B] text-[#fff]"
                }`}
                onClick={() =>
                  handleTipPercentageChange({ target: { value: "15" } })
                }
              >
                15%
              </button>
              <button
                className={`text-[20px] sm:text-2xl font-semibold max-w-[300.88px] h-[52px] rounded-[10px] ${
                  tipPercentage === "25"
                    ? "bg-[#9FE8DD] text-[#00474B]"
                    : "bg-[#00474B] text-[#fff]"
                }`}
                onClick={() =>
                  handleTipPercentageChange({ target: { value: "25" } })
                }
              >
                25%
              </button>
              <button
                className={`text-[20px] sm:text-2xl font-semibold max-w-[300.88px] h-[52px] rounded-[10px] ${
                  tipPercentage === "50"
                    ? "bg-[#9FE8DD] text-[#00474B]"
                    : "bg-[#00474B] text-[#fff]"
                }`}
                onClick={() =>
                  handleTipPercentageChange({ target: { value: "50" } })
                }
              >
                50%
              </button>
              {isCustomTipSelected ? (
                <>
                  <input
                    type="text"
                    value={customTip}
                    placeholder="0"
                    onChange={handleCustomTipChange}
                    autoFocus
                    className="max-w-[300.88px] h-[52px] bg-[#F3F8FB] rounded-[10px] outline-none focus:ring focus:ring-[#26C2AD] text-right text-2xl font-semibold leading-5 text-[#00474B] p-[5px] pr-[15px]"
                  />
                </>
              ) : (
                <button
                  className={`text-[20px] sm:text-2xl font-semibold max-w-[300.88px] h-[52px] rounded-[10px] ${
                    isCustomTipSelected
                      ? "bg-[#9FE8DD] text-[#00474B] hidden"
                      : "bg-[#F3F8FB] text-[#00474B]"
                  }`}
                  onClick={() =>
                    handleTipPercentageChange({ target: { value: "custom" } })
                  }
                >
                  Custom
                </button>
              )}
            </div>
            <label className="w-full text-xl font-semibold text-[#6B7777] inline-block mt-[20px] sm:mt-[60px] relative">
              Number of People:
              <div className="relative">
                <img
                  src={personSign}
                  alt="$"
                  className="absolute bottom-[15px] left-[15px]"
                />
                <input
                  type="text"
                  ref={numberOfPeopleInputRef}
                  value={numberOfPeople}
                  placeholder="0"
                  onChange={handleNumberOfPeopleChange}
                  className={`w-full h-[55px] mt-1 bg-[#F3F8FB] rounded-[10px] outline-none focus:ring focus:ring-[#26C2AD] text-right text-[22px] font-semibold leading-5 text-[#00474B] pr-[15px] ${
                    numberOfPeopleError ? "focus:ring focus:ring-[#B48372]" : ""
                  }`}
                />
              </div>
              {numberOfPeopleError && (
                <p className="text-xl font-semibold text-[#B48372] mt-[10px] lg:mt-0 static lg:absolute right-0 top-0">
                  {numberOfPeopleError}
                </p>
              )}
            </label>
          </div>
          <div className="w-full sm:basis-[50%] h-full bg-[#00474B] rounded-[15px] p-[20px] lg:p-[50px] flex flex-col justify-between">
            <div>
              <div className="flex flex-col 2sm:flex-row justify-center 2sm:justify-between mb-[20px] sm:mb-[60px]">
                <span className="text-xl font-medium leading-[30px] text-[#fff]">
                  Tip Amount <br />
                  <span className="text-base font-medium leading-[26px] text-[#649BA0]">
                    /person
                  </span>
                </span>
                <span className="text-[28px] sm:text-[40px] font-[700] text-[#21C3AC]">
                  <span className="text-[22px] sm:text-[32px]">$</span>
                  {calculateTipAmount().toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col 2sm:flex-row justify-center 2sm:justify-between">
                <span className="text-xl font-medium leading-[30px] text-[#fff]">
                  Total <br />
                  <span className="text-base font-medium leading-[26px] text-[#649BA0]">
                    /person
                  </span>
                </span>
                <span className="text-[28px] sm:text-[40px] font-[700] text-[#21C3AC]">
                  <span className="text-[22px] sm:text-[32px]">$</span>
                  {calculateTotalPerPerson().toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className={`w-full text-2xl font-semibold h-[52px] rounded-[10px] mt-[20px] sm:mt-[0px] ${
                numberOfPeople > 0
                  ? "bg-[#9FE8DD] text-[#00474B]"
                  : "bg-[#0D686D] text-[#004849] cursor-not-allowed"
              }`}
              disabled={numberOfPeople <= 0}
              onClick={resetCalculator}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splitter;