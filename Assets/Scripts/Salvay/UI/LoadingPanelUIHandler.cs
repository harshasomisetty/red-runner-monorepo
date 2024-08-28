using System;
using Best.SocketIO;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using TMPro;

public class LoadingPanelUIHandler : MonoBehaviour, SocketEventListener
{
    [SerializeField]
    private RectTransform popupTransform;

    [SerializeField]
    private Image panelBackgroundImage;

    [SerializeField]
    private TMP_Text contentText;

    private const float SlideDuration = 0.5f;
    private const float TIME_TO_SHOW_FOR = 60.0f;

    private Vector2 m_ShowingPosition;
    private Vector2 m_HiddenPosition;

    private bool m_IsTimeBased = true;
    private Tween m_CurrentTween = null; // Track the current active tween

    public enum PopupState
    {
        Hidden,
        Visible,
        Animating
    }

    private PopupState popupState = PopupState.Hidden;

    void Start()
    {
        SocketController.Instance.AddListener(this);

        m_HiddenPosition = popupTransform.anchoredPosition;
        m_ShowingPosition = new Vector2(0, 0);

        popupTransform.anchoredPosition = m_HiddenPosition;
        popupState = PopupState.Hidden;
    }

    public void ShowPopup(string text, bool _isTimeBased)
    {
        if (popupState == PopupState.Hidden || popupState == PopupState.Animating)
        {
            m_CurrentTween?.Kill(); // Kill any ongoing tween

            panelBackgroundImage.gameObject.SetActive(true);
            contentText.text = text;
            m_IsTimeBased = _isTimeBased;

            popupState = PopupState.Animating;

            if (m_IsTimeBased)
                Invoke(nameof(HidePopup), TIME_TO_SHOW_FOR);

            m_CurrentTween = popupTransform.DOAnchorPos(m_ShowingPosition, SlideDuration)
                .SetEase(Ease.OutCubic)
                .OnComplete(() =>
                {
                    popupState = PopupState.Visible;
                    m_CurrentTween = null;
                });
        }
    }

    public void HidePopup()
    {
        if (popupState == PopupState.Visible || popupState == PopupState.Animating)
        {
            m_CurrentTween?.Kill(); // Kill any ongoing tween

            popupState = PopupState.Animating;

            m_CurrentTween = popupTransform.DOAnchorPos(m_HiddenPosition, SlideDuration)
                .SetEase(Ease.InCubic)
                .OnComplete(() =>
                {
                    popupState = PopupState.Hidden;
                    panelBackgroundImage.gameObject.SetActive(false);
                    m_CurrentTween = null;
                });

            CancelInvoke(nameof(HidePopup));
        }
    }

    

    public void RemoveListener()
    {
        SocketController.Instance.RemoveListener(this);
    }

    private void OnDestroy()
    {
        RemoveListener();
    }

    void SocketEventListener.OnSocketMessageReceived(SocketEventsType messageHeader, string payLoad)
    {
        if (messageHeader== SocketEventsType.assetMintComplete)
            HidePopup();
    }

    void SocketEventListener.RemoveListener()
    {
        throw new NotImplementedException();
    }
}
