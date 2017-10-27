class AbstractTranslator:
    def __init__(self, source_text, translate_from, translate_to, queue=None):
        self.queue = queue
        self.source_text = source_text
        self.translate_from = translate_from
        self.translate_to = translate_to
        self.translation = ''

    def _external_api_integration(self):
        pass

    def _add_to_queue(self):
        pass

    def translate(self):
        pass
