import I18n from 'react-native-i18n';
import en from './en';
import zhCN from './zhCN';
import zhTW from './zhTW';
import zhGD from './zhGD';

I18n.fallbacks = true;

I18n.defaultLocale = 'zh-CN';

I18n.translations = {
    'en': en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'zh-GD': zhGD
};

export default {
    changeOpk: I18n.t('changeOpk'),
    settings: I18n.t('settings'),
    errorCode: I18n.t('errorCode'),
    navEndTask: I18n.t('navEndTask'),
    reboot_robot: I18n.t('reboot_robot'),
    cancel: I18n.t('cancel'),
    confirm: I18n.t('confirm'),
    overRunTitle: I18n.t('overRunTitle'),
    overRunSubTitle: I18n.t('overRunSubTitle'),
    noProcess: I18n.t('noProcess'),
    resumeWork: I18n.t('resumeWork'),
    pointArrive: I18n.t('pointArrive'),
    thisIsGreetPoint: I18n.t('thisIsGreetPoint'),
    repositionHint: I18n.t('repositionHint'),
    navi_fatal_error: I18n.t('navi_fatal_error'),
    nav_getLost_tts: I18n.t('nav_getLost_tts'),
    nav_fatalError_tts: I18n.t('nav_fatalError_tts'),
    warningTitle_getLost: I18n.t('warningTitle_getLost'),
    warningHint_getLost: I18n.t('warningHint_getLost'),
    continue_shipping: I18n.t('continue_shipping'),
    endTask: I18n.t('endTask'),
    warning_avoid_subTitle: I18n.t('warning_avoid_subTitle'),
    wheelErrorTts: I18n.t('wheelErrorTts'),
    warningTitle_fatalError: I18n.t('warningTitle_fatalError'),
    warningHint_fatalError: I18n.t('warningHint_fatalError'),
    contactHint: I18n.t('contactHint'),
    avoidTtsArray: I18n.t('avoidTtsArray'),
    standbyPoint: I18n.t('standbyPoint'),
    receptionPoint: I18n.t('receptionPoint'),
    chargePoint: I18n.t('chargePoint'),
    chargePile: I18n.t('chargePile'),
    locationPoint: I18n.t('locationPoint'),
    setTaskAcceptPoint: I18n.t('setTaskAcceptPoint'),
    emptyPoints: I18n.t('emptyPoints'),
    setPointsInMap: I18n.t('setPointsInMap'),
    waitOrderText: I18n.t('waitOrderText'),
    meal: I18n.t('meal'),
    welcome: I18n.t('welcome'),
    cruise: I18n.t('cruise'),
    leading: I18n.t('leading'),
    plateRecycling: I18n.t('plateRecycling'),
    switchDeskTTSArray: I18n.t('switchDeskTTSArray'),
    clickTask: I18n.t('clickTask'),
    pushFood: I18n.t('pushFood'),
    waiter: I18n.t('waiter'),
    lackTableware: I18n.t('lackTableware'),
    clearTable: I18n.t('clearTable'),
    passThanks: I18n.t('passThanks'),
    tablewareTitle: I18n.t('tablewareTitle'),
    bowl: I18n.t('bowl'),
    plate: I18n.t('plate'),
    chopsticks: I18n.t('chopsticks'),
    cup: I18n.t('cup'),
    fork: I18n.t('fork'),
    tableKnife: I18n.t('tableKnife'),
    spoon: I18n.t('spoon'),
    completeTableware: I18n.t('completeTableware'),
    complete: I18n.t('complete'),
    completeWithCount: I18n.t('completeWithCount'),
    big: I18n.t('big'),
    small: I18n.t('small'),
    wineGlass: I18n.t('wineGlass'),
    drinkingCup: I18n.t('drinkingCup'),
    soup: I18n.t('soup'),
    colander: I18n.t('colander'),
    smallSpoon: I18n.t('smallSpoon'),
    confirmTablewareTTS: I18n.t('confirmTablewareTTS'),
    taskConfirm: I18n.t('taskConfirm'),
    tableNum: I18n.t('tableNum'),
    taskType: I18n.t('taskType'),
    handleTask: I18n.t('handleTask'),
    toDoTask: I18n.t('toDoTask'),
    cancelTask: I18n.t('cancelTask'),
    cancelTaskWarn: I18n.t('cancelTaskWarn'),
    taskCanceled: I18n.t('taskCanceled'),
    robotDeliveryTableware: I18n.t('robotDeliveryTableware'),
    robotDeliveryTablewareWithTier: I18n.t('robotDeliveryTablewareWithTier'),
    humanDeliveryTableware: I18n.t('humanDeliveryTableware'),
    robotReply: I18n.t('robotReply'),
    noNeedRobotReply: I18n.t('noNeedRobotReply'),
    taskCancelSuccess: I18n.t('taskCancelSuccess'),
    pushFoodTitle: I18n.t('pushFoodTitle'),
    lackTablewareTitle: I18n.t('lackTablewareTitle'),
    clearTableTitle: I18n.t('clearTableTitle'),
    lookWaiterTitle1: I18n.t('lookWaiterTitle1'),
    tableArriveText1: I18n.t('tableArriveText1'),
    tableArriveText2: I18n.t('tableArriveText2'),
    takeOut: I18n.t('takeOut'),
    replyCustomer: I18n.t('replyCustomer'),
    getNewTask: I18n.t('getNewTask'),
    callPositionTaskTitle: I18n.t('callPositionTaskTitle'),
    pendingTaskCount: I18n.t('pendingTaskCount'),
    currentTaskCount: I18n.t('currentTaskCount'),
    taskCompleteFeedback: I18n.t('taskCompleteFeedback'),
    continueWorkGoodbye: I18n.t('continueWorkGoodbye'),
    tablewareTaskTrick: I18n.t('tablewareTaskTrick'),
    tablewareTaskTrickTts: I18n.t('tablewareTaskTrickTts'),
    okGetTaskHandle: I18n.t('okGetTaskHandle'),
    netError: I18n.t('netError'),
    taskHandleComplete: I18n.t('taskHandleComplete'),
    taskTakeTTS: I18n.t('taskTakeTTS'),
    humanReplyTTS: I18n.t('humanReplyTTS'),
    humanDeliveryTTS: I18n.t('humanDeliveryTTS'),
    tablewareEnterTTS: I18n.t('tablewareEnterTTS'),
    hurryTaskCompleteTTS: I18n.t('hurryTaskCompleteTTS'),
    waiterTaskCompleteTTS: I18n.t('waiterTaskCompleteTTS'),
    clearTableTaskCompleteTTS: I18n.t('clearTableTaskCompleteTTS'),
    tierPickTitle: I18n.t('tierPickTitle'),
    tierPickSubTitle: I18n.t('tierPickSubTitle'),
    robotReplayTTS: I18n.t('robotReplayTTS'),
    robotDeliveryTTS: I18n.t('robotDeliveryTTS'),
    errorToast: I18n.t('errorToast'),
    taskDialogTTS: I18n.t('taskDialogTTS'),
    callPositionTTS: I18n.t('callPositionTTS'),
    yes: I18n.t('yes'),
    no: I18n.t('no'),
    birthday1TTS: I18n.t('birthday1TTS'),
    thanksYouCanGo: I18n.t('thanksYouCanGo'),
    convertHurryTaskTTS: I18n.t('convertHurryTaskTTS'),
    convertTablewareTaskTTS: I18n.t('convertTablewareTaskTTS'),
    convertWaiterTaskTTS: I18n.t('convertWaiterTaskTTS'),
    convertClearTaskTTS: I18n.t('convertClearTaskTTS'),
    goWayCallMe: I18n.t('goWayCallMe'),
    birthdayLocalAsrArray: I18n.t('birthdayLocalAsrArray'),
    cannotArriveTip: I18n.t('cannotArriveTip'),
    deskSettings: I18n.t('deskSettings'),
    nav_multiRobotError_tts: I18n.t('nav_multiRobotError_tts'),
    // eslint-disable-next-line @typescript-eslint/camelcase
    warningHint_multiRobotError: I18n.t('warningHint_multiRobotError'),
    // eslint-disable-next-line @typescript-eslint/camelcase
    warningTitle_multiRobotError: I18n.t('warningTitle_multiRobotError'),
    deskService: I18n.t('deskService'),
    warningTitlePathInvalid: I18n.t('warningTitlePathInvalid'),
    warningSubTitlePathInvalid: I18n.t('warningSubTitlePathInvalid'),
    warningTitleRobotOutOfPath: I18n.t('warningTitleRobotOutOfPath'),
    warningSubTitleRobotOutOfPath: I18n.t('warningSubTitleRobotOutOfPath'),
    waringTitleTargetOutOfPath: I18n.t('waringTitleTargetOutOfPath'),
    warningSubTitleTargetOutOfPath: I18n.t('warningSubTitleTargetOutOfPath')
};
