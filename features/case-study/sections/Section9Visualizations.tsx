'use client';

import Image from 'next/image';
import CodeBlock from '../CodeBlock';

interface Section9Translations {
  title: string;
  paragraph1: {
    text: string;
    ggplot2: string;
    text2: string;
  };
  paragraph2: string;
  subsection1: {
    title: {
      text: string;
      highcharter: string;
    };
    intro: string;
    option1: {
      text: string;
      ggplot2: string;
      text2: string;
      ggiraphLink: string;
      ggiraphUrl: string;
      text3: string;
    };
    option2: {
      text: string;
      highcharterLink: string;
      highcharterUrl: string;
    };
    point1: {
      text: string;
      ggplot2: string;
      text2: string;
      highlightedText: string;
      text3: string;
    };
    point2: {
      text: string;
      highcharter: string;
      text2: string;
      highcharts: string;
      text3: string;
      highlightedText: string;
      text4: string;
      apiLink: string;
      apiUrl: string;
      text5: string;
    };
    point3: {
      text: string;
      italicText: string;
    };
    point4: {
      text: string;
      highlightedText: string;
      text2: string;
    };
    point5: {
      text: string;
      highcharter: string;
      text2: string;
      highlightedText: string;
      text3: string;
    };
    point6: string;
    becomesInR: string;
    point7: {
      text: string;
      italicText: string;
      text2: string;
    };
    point8: {
      text: string;
      highcharter: string;
      text2: string;
    };
    point9: string;
  };
  subsection2: {
    title: string;
    point1: string;
    point2: string;
    point3: {
      text: string;
      hcpxyAddPoint: string;
      text2: string;
      hcpxySetData: string;
      text3: string;
    };
    point4: {
      text: string;
      linkText: string;
      linkUrl: string;
    };
    point5: {
      text: string;
      linkText: string;
      linkUrl: string;
    };
  };
}

interface Section9VisualizationsProps {
  translations: Section9Translations;
}

export default function Section9Visualizations({
  translations,
}: Section9VisualizationsProps) {

  return (
    <div id="section-9" className="bg-white px-4 py-6 rounded-[20px]">
      <h2 className="font-serif text-[34px] leading-[40px] text-primary mb-4 font-normal">
        {translations.title}
      </h2>

      <div className="space-y-4 text-grey-text">
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph1.text}{' '}
          <span className="bg-[#F1EFEF] px-1 font-sans font-mono">
            {translations.paragraph1.ggplot2}
          </span>{' '}
          {translations.paragraph1.text2}
        </p>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.paragraph2}
        </p>

        <h3 className="text-primary-light mt-4 mb-2 text-lg font-semibold">
          {translations.subsection1.title.text}{' '}
          <span className="rounded bg-gray-100 px-1 py-0.5 font-mono text-gray-700">
            {translations.subsection1.title.highcharter}
          </span>
        </h3>
        <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
          {translations.subsection1.intro}
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.option1.text}{' '}
              <span className="bg-gray-100 font-mono">
                {translations.subsection1.option1.ggplot2}
              </span>
              , {translations.subsection1.option1.text2}{' '}
              <a
                href={translations.subsection1.option1.ggiraphUrl}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.subsection1.option1.ggiraphLink}
              </a>{' '}
              {translations.subsection1.option1.text3}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.option2.text}{' '}
              <a
                href={translations.subsection1.option2.highcharterUrl}
                className="text-primary-light rounded bg-gray-100 px-1 py-0.5 font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.subsection1.option2.highcharterLink}
              </a>
            </span>
          </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point1.text}{' '}
              <span className="bg-gray-100 font-mono">
                {translations.subsection1.point1.ggplot2}
              </span>{' '}
              {translations.subsection1.point1.text2}{' '}
              <span className="font-semibold">
                {translations.subsection1.point1.highlightedText}
              </span>{' '}
              {translations.subsection1.point1.text3}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point2.text}{' '}
              <span className="rounded bg-gray-100 px-1 py-0.5 font-mono">
                {translations.subsection1.point2.highcharter}
              </span>
              , {translations.subsection1.point2.text2}{' '}
              <span className="text-primary-light">
                {translations.subsection1.point2.highcharts}
              </span>{' '}
              {translations.subsection1.point2.text3}{' '}
              <span className="font-semibold">
                {translations.subsection1.point2.highlightedText}
              </span>{' '}
              {translations.subsection1.point2.text4}{' '}
              <a
                href={translations.subsection1.point2.apiUrl}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.subsection1.point2.apiLink}
              </a>{' '}
              {translations.subsection1.point2.text5}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point3.text}{' '}
              <span className="italic">
                {translations.subsection1.point3.italicText}
              </span>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point4.text}{' '}
              <span className="font-semibold">
                {translations.subsection1.point4.highlightedText}
              </span>
              {translations.subsection1.point4.text2}
            </span>
          </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point5.text}
              <span className="rounded bg-gray-100 px-1 py-0.5 font-mono">
                {translations.subsection1.point5.highcharter}
              </span>{' '}
              {translations.subsection1.point5.text2}{' '}
              <span className="font-semibold">
                {translations.subsection1.point5.highlightedText}
              </span>{' '}
              {translations.subsection1.point5.text3}
            </span>
          </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point6}
            </span>
          </li>

          {/* JavaScript Code Block */}
          <CodeBlock
            language="javascript"
            code={`Highcharts.chart('container', {
  chart: {
    type: 'line',
    backgroundColor: '#f0f0f0'
  },
  title: {
    text: 'Customized Chart'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {
    title: {
      text: 'values'
    },
    plotBands: [ // Highlighted range on the Y-axis
      {
        from: 5,
        to: 10,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'Safe Range',
          style: {
            color: '#606060'
          }
        }
      }
    ]
  },
  tooltip: {
    shared: true,
    valueSuffix: ' units'
  },
  series: [{
    name: 'Serie 1',
    data: [7, 6, 9, 14, 18, 21],
    color: '#FF5733'
  }, {
    name: 'Serie 2',
    data: [3, 4, 5, 8, 11, 15],
    color: '#33FF57'
  }]
});`}
          />

          <p className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em]">
            {translations.subsection1.becomesInR}
          </p>

          {/* R Code Block */}
          <CodeBlock
            language="r"
            code={`library(highcharter)

highchart() %>%
  hc_chart(type = "line", backgroundColor = "#f4f4f4") %>%
  hc_title(text = "Customized Chart") %>%
  hc_xAxis(categories = c("Jan", "Feb", "Mar", "Apr", "May", "Jun")) %>%
  hc_yAxis(
    title = list(text = "values"),
    plotBands = list(list(
      from = 5,
      to = 10,
      color = "rgba(68, 170, 213, 0.1)",
      label = list(text = "Safe Range", style = list(color = "#606060"))
    ))
  ) %>%
  hc_tooltip(shared = TRUE, valueSuffix = " units") %>%
  hc_series(
    list(
      name = "serie 1",
      data = c(7, 6, 9, 14, 18, 21),
      color = "#FF5733"
    ),
    list(
      name = "serie 2",
      data = c(3, 4, 5, 8, 11, 15),
      color = "#33FF57"
    )
          )`}
          />
        </ul>

        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point7.text}{' '}
              <span className="italic">{translations.subsection1.point7.italicText}</span>{' '}
              {translations.subsection1.point7.text2}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point8.text}{' '}
              <span className="rounded bg-gray-100 px-1 py-0.5 font-mono">
                {translations.subsection1.point8.highcharter}
              </span>{' '}
              {translations.subsection1.point8.text2}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection1.point9}
            </span>
          </li>
        </ul>

        <h3 className="text-primary-light mt-5 mb-2 text-lg font-semibold">
          {translations.subsection2.title}
        </h3>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection2.point1}
            </span>
          </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                          Let&apos;s say we want to display data showing the
                          evolution of web traffic, with{' '}
                          <span className="font-semibold">
                            second-by-second
                          </span>{' '}
                          accuracy, coming from a server API.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                          Here&apos;s an example illustrating this:
                        </span>
                      </li>
                      <h3 className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] font-medium italic mb-4">
                        Real Time Data evolution of web traffic with Highcharter
                      </h3>
                      <div className="mb-4 flex justify-center">
                        <video
                          className="shadow-md w-[300px] rounded-lg"
                          controls
                          autoPlay
                          loop
                          muted
                        >
                          <source
                            src="/case-study/real-time-chart.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                          In our example, API calls are simulated using the{' '}
                          <span className="rounded bg-[#F1EFEF] px-1 font-sans py-0.5 font-mono">
                            auto_invalidate
                          </span>
                          variable, which automatically resets every two seconds
                          thanks to the{' '}
                          <a
                            href="https://shiny.posit.co/r/reference/shiny/0.14/reactivetimer"
                            className="rounded bg-[#F1EFEF] px-1 font-sans py-0.5 font-mono font-medium text-primary-light hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            reactiveTimer()
                          </a>{' '}
                          function. This process is known as{' '}
                          <span className="font-semibold">
                            automatic invalidation
                          </span>{' '}
                          in Shiny.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
                          In our fictional example, with each reset, random data
                          is generated and incremented to the historical data.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <Image
                            src="/check-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection2.point3.text}{' '}
              <span className="rounded bg-[#F1EFEF] px-1 font-sans py-0.5 font-mono">
                {translations.subsection2.point3.hcpxyAddPoint}
              </span>{' '}
              {translations.subsection2.point3.text2}{' '}
              <span className="rounded bg-[#F1EFEF] px-1 font-sans py-0.5 font-mono">
                {translations.subsection2.point3.hcpxySetData}
              </span>
              , {translations.subsection2.point3.text3}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection2.point4.text}{' '}
              <a
                href={translations.subsection2.point4.linkUrl}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.subsection2.point4.linkText}
              </a>
              .
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <Image
                src="/check-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="font-sans text-md md:text-lg md:leading-[28px] tracking-[-0.004em] text-grey-text">
              {translations.subsection2.point5.text}{' '}
              <a
                href={translations.subsection2.point5.linkUrl}
                className="text-primary-light font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.subsection2.point5.linkText}
              </a>
              .
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
