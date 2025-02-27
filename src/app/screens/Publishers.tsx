import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Container from "../components/Container";
import PublishersTable from "../components/PublishersTable";
import Searchbar from "../components/Searchbar";

import utils from "../../common/lib/utils";

function Publishers() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const deletePublisher = async (id) => {
    await utils.call("deleteAllowance", { id });
    setData(data.filter((publisher) => publisher.id !== id));
  };

  function navigateToPublisher(id) {
    history.push(`/publishers/${id}`);
  }

  async function fetchData() {
    try {
      const response = await utils.call("listAllowances");
      const allowances = response.allowances.map((allowance) => {
        if (allowance.enabled && allowance.remainingBudget > 0) {
          allowance.badge = {
            label: "ACTIVE",
            color: "green-bitcoin",
            textColor: "white",
          };
        }
        return allowance;
      });
      setData(allowances);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <h2 className="mt-12 mb-6 text-2xl font-bold">Allowances</h2>

      {/* <div className="pb-1 border-b border-grey-200">
        <Searchbar />
      </div> */}

      <PublishersTable
        publishers={data}
        navigateToPublisher={navigateToPublisher}
      />
    </Container>
  );
}

export default Publishers;
