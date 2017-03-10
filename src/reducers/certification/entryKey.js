var entryKey = "";

export default function entryKeySetting(state = entryKey, action) {
  switch (action.type) {
    case "SetEntryKey":
      return action.key || state;
    case "ClearEntryKey":
      return "";
    default:
      return state;
  }
}
