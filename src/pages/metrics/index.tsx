import { Flex, Text } from "@chakra-ui/layout";
import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { MetricsCategory, allMetricsTags } from "../../../data/tag";
import Applications from "../../components/layout/Metrics/Applications";
import Devs from "../../components/layout/Metrics/Devs";
import Overviews from "../../components/layout/Metrics/Overviews";
import Transactions from "../../components/layout/Metrics/Transactions";
import Users from "../../components/layout/Metrics/Users";
import Sidebar from "../../components/layout/SideBar/Sidebar";

const MetricsPage: FC = () => {
  const [currentCategory, setCurrentCategory] = useState(allMetricsTags[0]);
  const [keyword, setKeyword] = useState<string>("");
  const LOADED_STEPS = 20;
  const [lastIndexLoaded, setLastIndexLoaded] = useState<number>(LOADED_STEPS);

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  const renderContent = () => {
    switch (currentCategory.value) {
      case MetricsCategory.USERS:
        return <Users />;
      case MetricsCategory.TRANSACTIONS:
        return <Transactions />;
      case MetricsCategory.APPLICATIONS:
        return <Applications />;
      case MetricsCategory.DEVS:
        return <Devs />;
      case MetricsCategory.OVERVIEWS:
      default:
        return <Overviews />;
    }
  };

  return (
    <Flex
      w="full"
      direction="column"
      justify="flex-start"
      align="flex-start"
      transform="translateZ(0)"
    >
      <Flex w="full" direction={{ base: "column", md: "row" }}>
        <Sidebar
          typeText="Resources"
          tags={allMetricsTags}
          initialValue={allMetricsTags[0]}
          onChange={(newValue) => {
            setCurrentCategory(newValue);
          }}
        />
        <Flex direction="column" w="full" align="flex-end">
          {renderContent()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MetricsPage;
