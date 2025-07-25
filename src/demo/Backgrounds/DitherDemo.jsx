import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import Dither from "../../content/Backgrounds/Dither/Dither";
import { dither } from "../../constants/code/Backgrounds/ditherCode";

const DitherDemo = () => {
  const [colors, setColors] = useState([0.5, 0.5, 0.5]);
  const [mouseRadius, setMouseRadius] = useState(0.3);
  const [colorNum, setColorNum] = useState(4);
  const [waveAmplitude, setWaveAmplitude] = useState(0.3);
  const [waveFrequency, setWaveFrequency] = useState(3);
  const [waveSpeed, setWaveSpeed] = useState(0.05);

  const [enableMouseInteraction, setEnableMouseInteraction] = useState(true);
  const [disableAnimation, setDisableAnimation] = useState(false);

  const propData = [
    {
      name: "waveSpeed",
      type: "number",
      default: "0.05",
      description: "Speed of the wave animation."
    },
    {
      name: "waveFrequency",
      type: "number",
      default: "3",
      description: "Frequency of the wave pattern."
    },
    {
      name: "waveAmplitude",
      type: "number",
      default: "0.3",
      description: "Amplitude of the wave pattern."
    },
    {
      name: "waveColor",
      type: "[number, number, number]",
      default: "[0.5, 0.5, 0.5]",
      description: "Color of the wave, defined as an RGB array."
    },
    {
      name: "colorNum",
      type: "number",
      default: "4",
      description: "Number of colors to use in the dithering effect."
    },
    {
      name: "pixelSize",
      type: "number",
      default: "2",
      description: "Size of the pixels for the dithering effect."
    },
    {
      name: "disableAnimation",
      type: "boolean",
      default: "false",
      description: "Disable the wave animation when true."
    },
    {
      name: "enableMouseInteraction",
      type: "boolean",
      default: "true",
      description: "Enables mouse interaction to influence the wave effect."
    },
    {
      name: "mouseRadius",
      type: "number",
      default: "1",
      description: "Radius for the mouse interaction effect."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <Dither
            waveColor={colors}
            disableAnimation={disableAnimation}
            enableMouseInteraction={enableMouseInteraction}
            mouseRadius={mouseRadius}
            colorNum={colorNum}
            waveAmplitude={waveAmplitude}
            waveFrequency={waveFrequency}
            waveSpeed={waveSpeed}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Retro dithered waves to enhance your UI"
          />
        </Box>

        <Customize>
          <Text fontSize="sm">Colors</Text>
          <Flex gap={4} wrap="wrap">
            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={colors[0]}
                title="Red"
                onChange={(val) => {
                  setColors(prev => {
                    const newColors = [...prev];
                    newColors[0] = val;
                    return newColors;
                  });
                }}
              />
            </Flex>

            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={colors[1]}
                title="Green"
                onChange={(val) => {
                  setColors(prev => {
                    const newColors = [...prev];
                    newColors[1] = val;
                    return newColors;
                  });
                }}
              />
            </Flex>

            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={colors[2]}
                title="Blue"
                onChange={(val) => {
                  setColors(prev => {
                    const newColors = [...prev];
                    newColors[2] = val;
                    return newColors;
                  });
                }}
              />
            </Flex>
          </Flex>

          <PreviewSlider
            title="Color Intensity"
            min={2.5}
            max={40}
            step={0.1}
            value={colorNum}
            onChange={(val) => {
              setColorNum(val);
            }}
          />

          <PreviewSlider
            title="Wave Amplitude"
            min={0}
            max={1}
            step={0.01}
            value={waveAmplitude}
            onChange={(val) => {
              setWaveAmplitude(val);
            }}
          />

          <PreviewSlider
            title="Wave Frequency"
            min={0}
            max={10}
            step={0.1}
            value={waveFrequency}
            onChange={(val) => {
              setWaveFrequency(val);
            }}
          />

          <PreviewSwitch title="Disable Animation" isChecked={disableAnimation} onChange={(checked) => { setDisableAnimation(checked); }} />
          <PreviewSlider
            title="Wave Speed"
            min={0}
            max={0.10}
            isDisabled={disableAnimation}
            step={0.01}
            value={waveSpeed}
            onChange={(val) => {
              setWaveSpeed(val);
            }}
          />

          <PreviewSwitch title="Mouse Interaction" isChecked={enableMouseInteraction} onChange={(checked) => { setEnableMouseInteraction(checked); }} />

          <PreviewSlider
            title="Mouse Radius"
            min={0}
            isDisabled={!enableMouseInteraction}
            max={2}
            step={0.1}
            value={mouseRadius}
            onChange={(val) => {
              setMouseRadius(val);
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', 'postprocessing', '@react-three/fiber', '@react-three/postprocessing']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={dither} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...dither} />
      </CliTab>
    </TabbedLayout>
  );
};

export default DitherDemo;