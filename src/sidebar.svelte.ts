let value = $state(false)
export const sidebar = {
  get show() {
    return value
  },
  set show(bool: boolean) {
    value = bool
  }
}

export const items = [
  ["Fliserens", "/"],
  ["Algebehandling"],
  ["Referencer"],
  ["Om Firmaet", "om-firmaet.aspx"],
  ["Kontakt"],
] satisfies ([string] | [string, string])[]