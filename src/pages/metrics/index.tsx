import { Flex, Text } from "@chakra-ui/layout";
import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import useInView from "react-cool-inview";
import { MetricsCategory } from "../../../data/tag";

import Menu from "../../components/layout/Menu";

const AcademyPage: FC = () => {
  const [currentCategory, setCurrentCategory] = useState(allAcademyTags[0]);
  const [keyword, setKeyword] = useState<string>("");
  const LOADED_STEPS = 20;
  const [lastIndexLoaded, setLastIndexLoaded] = useState<number>(LOADED_STEPS);

  const { observe } = useInView({
    // When the last item comes to the viewport
    onEnter: ({ unobserve }) => {
      // Pause observe when loading data
      unobserve();
      setLastIndexLoaded(lastIndexLoaded + LOADED_STEPS);
    },
  });

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  const renderContent = () => {
    switch (currentCategory.value) {
      case MetricsCategory.USERS:
        return (
          <ContributeContent
            resources={academyResourcesBundle.contributions}
            observe={observe}
            keyword={keyword}
          />
        );
      case MetricsCategory.TRANSACTIONS:
        return (
          <ToolsContent
            resources={academyResourcesBundle.tools}
            observe={observe}
            keyword={keyword}
          />
        );
      case MetricsCategory.APPLICATIONS:
        return (
          <WalletsContent
            resources={academyResourcesBundle.wallets}
            observe={observe}
            keyword={keyword}
          />
        );
      case MetricsCategory.DEVS:
        return (
          <NewsInfosContent
            resources={academyResourcesBundle.newsfeed}
            observe={observe}
            keyword={keyword}
          />
        );
      case MetricsCategory.OVERVIEWS:
      default:
        return (
          <LearnContent
            observe={observe}
            highlightedResources={academyResourcesBundle.learning.highlighted}
            resources={academyResourcesBundle.learning.other}
            keyword={keyword}
          />
        );
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
      <HighlightedText highlighted={t.common.academy || "Academy"} />
      {/* Sub intro text */}
      <Text
        zIndex={1}
        mt={8}
        textAlign="start"
        color="whiteAlpha.600"
        fontSize="20px"
        maxWidth="600px"
      >
        {t.common.academy_subtitle ||
          "Your StarkNet learning shop. Find tutorials, guides, contributions, libraries. Subscribe to newsletters to keep track on this very fast-moving ecosystem."}
      </Text>
      <Flex w="full" direction={{ base: "column", md: "row" }} mt={24}>
        <Menu
          typeText="Resources"
          tags={allAcademyTags}
          initialValue={allAcademyTags[0]}
          onChange={(newValue) => {
            setCurrentCategory(newValue);
          }}
        />
        <Flex direction="column" w="full" align="flex-end">
          <Input
            debounce={200}
            my={2}
            mb={8}
            maxW={{ base: "inherit", md: "250px" }}
            onChange={handleChangeKeyword}
            placeholder="Search"
          />
          {renderContent()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AcademyPage;
