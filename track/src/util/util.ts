import { Page, ConsoleMessage, Browser } from "puppeteer";
import { IOrder, ICrawlResult, ISerpPage } from "../type/type";
import { AD_TEST } from "../const/const";
import { locations } from "./locations";
import UserAgents from "user-agents";
import { parse } from "useragent";
import { UserAgentConfig } from "./util.type";

export function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const createPage = async (browser: Browser): Promise<Page> => {
  return await browser.newPage();
};

export function delay(time: Number) {
  return new Promise(function (resolve) {
    //@ts-ignore
    setTimeout(resolve, time);
  });
}

export const getLocation = (location: string) => {
  return location == "no_location"
    ? ""
    : locations[location]
    ? locations[location]
    : "";
};

export const createURL = (order: IOrder) => {
  const mobile =
    order.params.device == "mobile"
      ? "&adtest-useragent=Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%205_0%20like%20Mac%20OS%20X)%20AppleWebKit/534.46%20(KHTML,%20like%20Gecko)%20Version/5.1%20Mobile/9A334%20Safari/7534.48.3"
      : "";

  const getQuery = (query: string) => encodeURIComponent(query);
  const getAdTest = (adTest: string) => adTest || AD_TEST;
  const getSafe = () => "&safe=images&safe=high";

  return `https://www.google.pl/search?q=${getQuery(
    order.params.query
  )}&adtest=${getAdTest(order.params.adTest)}&hl=${
    order.params.hl
  }${mobile}${getSafe()}${getLocation(order.params.location)}`;
};

const platoform = ["MacIntel", "Win32", "Linux x86_64", "Linux armv81"];

const getDesktopUserAgent = (data?: UserAgentConfig) => {
  //@ts-ignore
  // const userAgent = UserAgents.random()

  const userAgent = new UserAgents({
    deviceCategory: "desktop",
    platform: "Win32",
  });

  // new UserAgents((data) => {
  //     const os = parse(data.userAgent).os;
  //     return os.family === 'iOS' && parseInt(os.major, 10) > 11;
  //   });

  //@ts-ignore
  userAgent.data = {
    ...userAgent.data,
    ...{
      deviceCategory: "desktop",
      screenHeight: 1080,
      screenWidth: 1920,
      viewportHeight: 953,
      viewportWidth: 1920,
      platform: platoform[Math.floor(Math.random() * platoform.length)],
    },
    ...data,
  };

  return userAgent;
};

export const initPage = async (
  order: IOrder,
  browser: Browser
): Promise<Page> => {
  const page = await createPage(browser);
  await page.setUserAgent(getDesktopUserAgent().toString());
  return page;
};

export const setTimeoutError = (
  resolve: (reason: ICrawlResult) => void,
  reject: (reason: ICrawlResult) => void,
  organicResults: ISerpPage[],
  page: Page,
  browser: Browser
) => {
  setTimeout(async () => {
    await browser.close();
    resolve({
      success: false,
      error: {
        type: "timeout",
      },
      serp: organicResults,
    });
  }, 100000);
};
