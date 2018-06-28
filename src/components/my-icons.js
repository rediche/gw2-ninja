import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";

const $_documentContainer = document.createElement("template");
$_documentContainer.setAttribute("style", "display: none;");
$_documentContainer.innerHTML = `<iron-iconset-svg name="my-icons" size="24">
  <svg>
    <defs>
      <g id="arrow-back">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
      </g>
      <g id="menu">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
      </g>
      <g id="chevron-right">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </g>
      <g id="close">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </g>
      <g id="settings">
        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </g>
      <g id="content-copy">
        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
      </g>
      <g id="logo">
          <path d="M20.4771574,15.9650655 L21.8984772,16.768559 L20.4416244,16.4541485 C20.2639594,16.9082969 20.0507614,17.3275109 19.8020305,17.7467249 C19.5888325,18.0960699 19.3756345,18.4104803 19.1269036,18.7248908 L18.7715736,21.6943231 L18.4517766,19.6681223 L18.4517766,19.5633188 L18.2385787,19.7729258 C17.6345178,20.3318777 16.9593909,20.8209607 16.248731,21.2052402 C15.893401,21.3799127 15.5025381,21.5545852 15.1472081,21.6943231 L10.0304569,24 C10.0304569,24 11.5939086,23.231441 12.3401015,22.2882096 C11.4517766,22.3580786 10.5634518,22.3231441 9.74619289,22.1484716 C9.17766497,22.0087336 8.60913706,21.8689956 8.11167513,21.6593886 L7.25888325,22.1484716 L7.72081218,21.4847162 C7.22335025,21.2751092 6.76142132,21.0305677 6.33502538,20.7510917 C5.37563452,20.1572052 4.62944162,19.4235808 4.06091371,18.7598253 C3.49238579,18.0611354 3.06598985,17.4323144 2.78172589,16.8733624 C2.46192893,16.349345 2.28426396,15.8951965 2.17766497,15.580786 C2.07106599,15.2663755 2,15.0917031 2,15.0917031 C2,15.0917031 2.07106599,15.231441 2.21319797,15.5458515 C2.35532995,15.860262 2.56852792,16.279476 2.88832487,16.8034934 C3.20812183,17.3275109 3.67005076,17.9213974 4.27411168,18.5502183 L4.41624365,18.6899563 L6.1928934,18.6200873 C6.1928934,18.6200873 4.84263959,18.7947598 4.87817259,19.1091703 L4.84263959,19.0742358 C5.12690355,19.3187773 5.44670051,19.5633188 5.80203046,19.8078603 L6.97461929,19.8078603 C6.97461929,19.8078603 6.33502538,19.8777293 6.1928934,20.0524017 C6.29949239,20.1572052 6.44162437,20.2270742 6.58375635,20.2969432 C7.54314721,20.8209607 8.64467005,21.2052402 9.88832487,21.3799127 C10.0304569,21.3799127 10.1725888,21.4148472 10.3147208,21.4148472 L10.5634518,20.3318777 L10.8121827,21.4497817 C11.7360406,21.4497817 12.7309645,21.3449782 13.7258883,21.0305677 C14.2944162,20.8558952 14.8274112,20.6113537 15.3604061,20.3318777 C14.8629442,19.9126638 13.6548223,19.9475983 13.6548223,19.9475983 L16.106599,19.8427948 C16.4974619,19.5633188 16.8883249,19.2139738 17.2436548,18.8296943 C17.7055838,18.3056769 18.1319797,17.7117904 18.4517766,17.0480349 C18.7005076,16.558952 18.9137056,16.0349345 19.0558376,15.510917 C18.4162437,15.6855895 17.2791878,17.0131004 17.2791878,17.0131004 L19.2690355,14.1484716 C19.3401015,13.2401747 19.3045685,12.3318777 19.0913706,11.4235808 L17.7411168,10.9344978 L18.9847716,10.9694323 C18.9492386,10.8296943 18.9137056,10.6899563 18.8781726,10.5851528 L18.7715736,10.3406114 L18.7360406,10.2008734 L18.6649746,10.1659389 C18.5939086,9.99126638 18.4873096,9.81659389 18.4162437,9.6768559 L18.3807107,9.6419214 L16.8883249,9.95633188 L16.8883249,9.99126638 C16.9949239,10.2008734 17.1370558,10.4104803 17.2436548,10.6550218 C17.3502538,10.8646288 17.4568528,11.1091703 17.5279188,11.3537118 C17.6700508,11.8427948 17.7766497,12.3668122 17.7766497,12.8558952 L17.7766497,12.9956332 L18.5939086,12.9257642 L17.7766497,13.4497817 C17.7766497,13.7641921 17.7411168,14.0436681 17.6700508,14.3580786 C17.4923858,15.3362445 17.1015228,16.3144105 16.4263959,17.1877729 C16.284264,17.3973799 16.106599,17.6069869 15.928934,17.7816594 C16.3908629,18.3755459 16.8527919,18.7598253 16.8527919,18.7598253 L15.2893401,18.3406114 L15.2182741,18.4104803 C14.9695431,18.5851528 14.7208122,18.7248908 14.4365482,18.8646288 C14.2944162,18.9344978 14.1522843,18.9694323 14.0101523,19.0393013 C13.9390863,19.0742358 13.8680203,19.0742358 13.7969543,19.1091703 L13.5837563,19.1790393 C13.1928934,19.2838428 12.7664975,19.3537118 12.3401015,19.4235808 L12.1624365,20.5065502 L11.8426396,19.4585153 C11.5228426,19.4934498 11.1675127,19.4934498 10.8477157,19.4585153 C9.99492386,19.5982533 8.46700508,19.6681223 6.8680203,19.2139738 C6.8680203,19.2139738 8.21827411,19.3886463 8.85786802,19.0742358 C8.78680203,19.0393013 8.71573604,19.0393013 8.64467005,19.0043668 C8.07614213,18.7598253 7.47208122,18.4803493 6.9035533,18.0611354 L6.47715736,17.7467249 C6.33502538,17.6419214 6.2284264,17.5371179 6.08629442,17.3973799 L5.87309645,17.1877729 L4.73604061,17.9912664 L5.5177665,16.8034934 C5.44670051,16.7336245 5.41116751,16.6637555 5.34010152,16.5938865 C4.87817259,16.0349345 4.48730964,15.371179 4.20304569,14.6375546 C4.06091371,15.0567686 4.02538071,15.790393 4.02538071,15.790393 L3.81218274,13.2751092 C3.77664975,12.9257642 3.70558376,12.5764192 3.70558376,12.1921397 L3.70558376,11.6681223 C2.85279188,12.1572052 2.07106599,13.4847162 2.07106599,13.4847162 L3.88324873,10.1659389 C3.91878173,9.99126638 3.95431472,9.85152838 3.98984772,9.6768559 C4.06091371,9.39737991 4.16751269,9.11790393 4.27411168,8.83842795 L4.55837563,8.0349345 L2.99492386,7.47598253 L4.7715736,7.51091703 L5.73096447,4.8558952 L5.5177665,6.63755459 C5.90862944,6.14847162 6.37055838,5.69432314 6.8680203,5.31004367 C7.25888325,4.99563319 7.64974619,4.7510917 8.07614213,4.54148472 C8.2893401,4.40174672 8.53807107,4.33187773 8.78680203,4.22707424 C8.57360406,3.91266376 8.18274112,3.70305677 8.04060914,3.63318777 L8.00507614,3.59825328 L5.5177665,2.44541485 L10.7766497,3.77292576 C11.0964467,3.73799127 11.3807107,3.73799127 11.7005076,3.73799127 L12.1624365,1.85152838 L12.4111675,3.80786026 C12.5888325,3.80786026 12.7309645,3.80786026 12.9086294,3.84279476 C13.1218274,3.87772926 13.2994924,3.91266376 13.5126904,3.94759825 L11.2385787,6.18340611 C10.9187817,6.21834061 10.6345178,6.28820961 10.3502538,6.3580786 L9.92385787,7.82532751 L11.5228426,6.14847162 L12.1624365,5.48471616 L14.7918782,2.75982533 L13.8680203,4.01746725 C14.0101523,4.05240175 14.1878173,4.08733624 14.3299492,4.12227074 L12.9086294,5.31004367 L12.2690355,6.18340611 L19.0913706,0 L15.680203,4.43668122 L15.6091371,4.54148472 C15.786802,4.64628821 16,4.71615721 16.177665,4.8209607 C16.213198,4.8558952 16.284264,4.89082969 16.3553299,4.92576419 L17.5989848,3.84279476 L16.8172589,5.20524017 C16.9949239,5.31004367 17.1725888,5.44978166 17.3502538,5.55458515 C17.4923858,5.65938865 17.5989848,5.76419214 17.7411168,5.86899563 L22.1827411,6.63755459 L19.6954315,6.67248908 C19.5532995,6.67248908 19.1269036,6.70742358 18.8426396,6.91703057 C19.0203046,7.12663755 19.1979695,7.33624454 19.3401015,7.54585153 C19.6243655,7.930131 19.8730964,8.34934498 20.0862944,8.76855895 C20.1928934,8.94323144 20.2639594,9.11790393 20.3350254,9.29257642 L21.3299492,7.54585153 L20.5837563,9.95633188 L20.6192893,10.0611354 C20.6903553,10.3056769 20.7614213,10.5152838 20.7969543,10.7248908 L23,14.8471616 C23,14.8471616 22.0406091,13.1703057 20.9746193,12.5764192 C21.0101523,13.5196507 20.9035533,14.4279476 20.6548223,15.3362445 C20.6192893,15.5458515 20.5482234,15.7554585 20.4771574,15.9650655 L20.4771574,15.9650655 Z M17.0659898,7.9650655 C16.7817259,7.75545852 16.4974619,7.51091703 16.213198,7.30131004 C15.680203,6.95196507 15.1472081,6.70742358 14.5431472,6.49781659 C14.4010152,6.95196507 14.3654822,7.40611354 14.5431472,7.79039301 C14.5431472,7.79039301 14.5786802,7.82532751 14.6142132,7.82532751 L16.6040609,7.72052402 C16.6040609,7.72052402 15.3248731,7.89519651 15.2893401,8.20960699 C15.4314721,8.27947598 15.5380711,8.38427948 15.6446701,8.45414847 L16.6040609,8.45414847 C16.6040609,8.45414847 16.106599,8.52401747 15.893401,8.66375546 L16.248731,9.01310044 C16.248731,9.04803493 16.284264,9.08296943 16.319797,9.11790393 L19.8020305,9.25764192 L17.9898477,8.97816594 C17.9543147,8.90829694 17.8832487,8.80349345 17.8121827,8.73362445 C17.5989848,8.45414847 17.3502538,8.20960699 17.0659898,7.9650655 L17.0659898,7.9650655 Z M9.21319797,14.2882096 C9.17766497,14.2882096 9.17766497,14.2882096 9.14213198,14.2532751 L9.07106599,14.2183406 L8.78680203,13.9388646 C8.46700508,14.0087336 8.36040609,14.7772926 8.36040609,14.7772926 L8.2893401,13.2401747 C8.25380711,13.2052402 8.25380711,13.1703057 8.21827411,13.1353712 C8.14720812,13.0305677 8.11167513,12.8908297 8.04060914,12.7510917 C7.86294416,12.1921397 7.79187817,11.5633188 7.89847716,10.8646288 L7.96954315,10.5851528 C8.00507614,10.5152838 8.00507614,10.4454148 8.04060914,10.3755459 L7.6142132,9.32751092 L8.3248731,9.88646288 L8.36040609,9.81659389 C8.43147208,9.74672489 8.46700508,9.6419214 8.50253807,9.5720524 C8.53807107,9.50218341 8.60913706,9.39737991 8.64467005,9.32751092 C8.68020305,9.25764192 8.75126904,9.22270742 8.78680203,9.15283843 L10.1015228,6.4628821 L10.9187817,4.8209607 L9.81725888,6.56768559 L9.39086294,6.77729258 C9.14213198,6.91703057 8.89340102,7.09170306 8.64467005,7.30131004 C8.18274112,7.68558952 7.79187817,8.17467249 7.47208122,8.69868996 C7.18781726,9.22270742 6.97461929,9.78165939 6.83248731,10.3406114 C6.69035533,10.8995633 6.65482234,11.4585153 6.69035533,11.9825328 C6.69035533,12.2620087 6.72588832,12.5065502 6.79695431,12.7510917 C6.83248731,12.8558952 6.8680203,12.9956332 6.9035533,13.1004367 C6.97461929,13.2401747 7.01015228,13.3449782 7.04568528,13.4497817 C7.11675127,13.6593886 7.22335025,13.8689956 7.36548223,14.0786026 C7.50761421,14.2882096 7.64974619,14.4628821 7.79187817,14.6375546 C7.93401015,14.8122271 8.07614213,14.9868996 8.25380711,15.1266376 C8.3248731,15.1965066 8.43147208,15.2663755 8.50253807,15.3362445 C8.57360406,15.371179 8.68020305,15.441048 8.75126904,15.510917 C9.10659898,15.7554585 9.46192893,15.930131 9.81725888,16.069869 C10.1725888,16.209607 10.5279188,16.279476 10.8477157,16.3144105 C11.4873096,16.3842795 12.1624365,16.3144105 12.8375635,16.139738 L12.9441624,16.139738 C12.9441624,16.1048035 12.9796954,16.1048035 13.0152284,16.1048035 C13.0862944,16.069869 13.1218274,16.069869 13.1928934,16.0349345 C13.2994924,16 13.4060914,15.930131 13.5126904,15.860262 C13.6192893,15.790393 13.7258883,15.720524 13.8324873,15.6157205 C13.9390863,15.510917 14.0456853,15.4061135 14.1167513,15.30131 C14.4720812,14.8471616 14.7208122,14.2532751 14.8629442,13.6943231 C14.9340102,13.4148472 14.9695431,13.1004367 14.9695431,12.8209607 C14.5431472,12.6462882 13.3705584,13.7641921 13.3705584,13.7641921 L14.7918782,11.7379913 C14.7563452,11.7379913 14.7563452,11.7030568 14.7563452,11.7030568 C14.7208122,11.5633188 14.6497462,11.4585153 14.6142132,11.3537118 C14.5786802,11.2838428 14.5431472,11.2489083 14.5076142,11.1790393 C14.5076142,11.1790393 14.5076142,11.1441048 14.4720812,11.1091703 L14.4010152,11.0393013 C14.3654822,11.0043668 14.3299492,10.9344978 14.2944162,10.8995633 C14.2233503,10.8646288 14.1878173,10.7947598 14.1522843,10.7598253 C13.9746193,10.5502183 13.7969543,10.4104803 13.5837563,10.2707424 C13.4771574,10.2008734 13.3705584,10.1659389 13.2639594,10.0960699 C13.1928934,10.0611354 13.1573604,10.0611354 13.0862944,10.0262009 C13.0152284,9.99126638 12.9796954,9.95633188 12.9086294,9.95633188 C12.8375635,9.92139738 12.8020305,9.92139738 12.7309645,9.88646288 C12.6598985,9.88646288 12.6243655,9.85152838 12.5532995,9.85152838 C12.5177665,9.81659389 12.4467005,9.81659389 12.4111675,9.81659389 L12.6243655,11.2489083 L11.6294416,9.81659389 L11.5939086,9.81659389 C11.5583756,9.81659389 11.4873096,9.85152838 11.4517766,9.85152838 C11.4162437,9.85152838 11.3451777,9.88646288 11.3096447,9.88646288 C11.2741117,9.92139738 11.2741117,9.92139738 11.2385787,9.92139738 L11.1675127,9.95633188 C11.1319797,9.99126638 11.0609137,9.99126638 11.0253807,10.0262009 C10.8477157,10.0960699 10.6700508,10.2008734 10.5279188,10.3406114 L10.2081218,10.6550218 C10.1725888,10.6899563 10.1725888,10.7248908 10.1370558,10.7598253 L10.0659898,10.8995633 C10.0304569,10.9344978 10.0304569,10.9694323 9.99492386,11.0043668 C9.95939086,11.0393013 9.95939086,11.0742358 9.92385787,11.1091703 L9.85279188,11.2489083 C9.74619289,11.5982533 9.7106599,11.9126638 9.74619289,12.2620087 C9.78172589,12.5764192 9.88832487,12.8209607 9.99492386,13.0305677 C10.3857868,13.1353712 10.9898477,13.1004367 11.7715736,12.6812227 C11.7715736,12.6812227 11.3096447,13.3449782 10.4213198,13.5545852 C11.0609137,14.3231441 13.2284264,14.2882096 13.2284264,14.2882096 C13.2284264,14.2882096 10.7766497,15.2663755 9.21319797,14.2882096 L9.21319797,14.2882096 Z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);