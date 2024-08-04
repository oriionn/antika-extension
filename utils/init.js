async function initExtension(name) {
  let result = await nav.storage.sync.get();
  let disabled = result.disabled || [];
  if (disabled.includes(name)) throw new Error("Mail.ru is disabled");
}
