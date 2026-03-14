import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Cookie, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "emilio_cookie_consent";

const getStoredPreferences = (): CookiePreferences | null => {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredPreferences();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    setVisible(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Cookie settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 relative">
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 mb-4">
            <Cookie className="w-6 h-6 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {t("cookies.bannerTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {t("cookies.bannerDesc")}
              </p>
            </div>
          </div>

          {showCustomize && (
            <div className="space-y-3 mb-5 border-t border-border pt-4">
              {/* Necessary */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{t("cookies.necessaryTitle")}</p>
                  <p className="text-xs text-muted-foreground">{t("cookies.necessaryDesc")}</p>
                </div>
                <Switch checked disabled />
              </div>
              {/* Analytics */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{t("cookies.analyticsTitle")}</p>
                  <p className="text-xs text-muted-foreground">{t("cookies.analyticsDesc")}</p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(v) => setPreferences((p) => ({ ...p, analytics: v }))}
                />
              </div>
              {/* Marketing */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{t("cookies.marketingTitle")}</p>
                  <p className="text-xs text-muted-foreground">{t("cookies.marketingDesc")}</p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(v) => setPreferences((p) => ({ ...p, marketing: v }))}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-2">
            {showCustomize ? (
              <Button onClick={handleSaveCustom} className="w-full sm:w-auto">
                {t("cookies.savePreferences")}
              </Button>
            ) : (
              <>
                <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
                  {t("cookies.acceptAll")}
                </Button>
                <Button onClick={handleRejectAll} variant="outline" className="w-full sm:w-auto">
                  {t("cookies.rejectAll")}
                </Button>
                <Button
                  onClick={() => setShowCustomize(true)}
                  variant="ghost"
                  className="w-full sm:w-auto gap-1"
                >
                  <Settings className="w-4 h-4" />
                  {t("cookies.customize")}
                </Button>
              </>
            )}
          </div>

          <div className="mt-3 text-center">
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary underline">
              {t("cookies.policyLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
