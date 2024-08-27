using System;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class PopupData
{
    public Action firstButtonCallBack, secondButtonCallBack;
    public string titleString,contentString,firstButtonString,secondButtonString;
    public bool showSecondButton = false;
}

public class GenericPopUIHandler : MonoBehaviour
{
    [SerializeField]
    private GameObject panelParent;
    [SerializeField]
    private RectTransform popupTransform; // Reference to the UI element's RectTransform
    
    [SerializeField]
    private TMP_Text contentText,titleText,firstButtonText,secondButtonText; // Reference to the UI element's RectTransform
    
    [SerializeField]
    private Button firstButton,secondButton; // Reference to the UI element's RectTransform
    
    private const float SlideDuration = 0.5f; // Duration for the slide-in and slide-out animations
    // private const float StayDuration = 3.0f; // How long the popup stays before sliding back
    private Vector2 m_InitialPosition;
    private Vector2 m_HiddenPosition;

    [SerializeField]
    private GameObject SpecialKillButton;

    public enum AnimatedUIState
    {
        Hidden,
        Visible,
        Animating
    }

    public AnimatedUIState animatedUIState = AnimatedUIState.Hidden; // Tracks the current state of the popup
    private PopupData popupData;

    private void Start()
    {
        m_HiddenPosition = popupTransform.anchoredPosition;
        m_InitialPosition = new Vector2(0,0);

        // Move the popup to the hidden position initially
        popupTransform.anchoredPosition = m_HiddenPosition;

        // Ensure the state is set to Hidden initially
        animatedUIState = AnimatedUIState.Hidden;
    }

    public void FirstButtonPressed()
    {
        popupData.firstButtonCallBack?.Invoke();
        HidePopup();
    }
    
    public void SecondButtonPressed()
    {
        if (popupData.showSecondButton)
        {
            popupData.secondButtonCallBack?.Invoke();
            HidePopup();
        }
    }


    
    private void SetupPopup(PopupData _data)
    {
        popupData = _data;
        contentText.text = popupData.contentString;
        titleText.text = popupData.titleString;
        firstButtonText.text = popupData.firstButtonString;
        secondButton.gameObject.SetActive(popupData.showSecondButton);
        secondButtonText.text = popupData.showSecondButton? popupData.secondButtonString : "";
    }
    
    public void ShowPopup(PopupData _data)
    {
        ToggleSpecialKillButton(false);
        if (animatedUIState == AnimatedUIState.Hidden)
        {
            panelParent.SetActive(true);
            SetupPopup(_data);
            // Update the state to Animating
            animatedUIState = AnimatedUIState.Animating;
            
            // Slide in to the initial position
            popupTransform.DOAnchorPos(m_InitialPosition, SlideDuration).SetEase(Ease.OutCubic).SetUpdate(UpdateType.Normal,true).OnComplete(() =>
            {
                // Update the state to Visible after the animation completes
                animatedUIState = AnimatedUIState.Visible;

                // Wait for the stay duration and then slide back out
                // DOVirtual.DelayedCall(StayDuration, () =>
                // {
                //     HidePopup();
                // });
            });
        }
    }

    public void HidePopup()
    {
        if (animatedUIState == AnimatedUIState.Visible)
        {
            // Update the state to Animating
            animatedUIState = AnimatedUIState.Animating;

            // Slide out to the hidden position
            popupTransform.DOAnchorPos(m_HiddenPosition, SlideDuration).SetUpdate(UpdateType.Normal,true).SetEase(Ease.InCubic).OnComplete(() =>
            {
                // Update the state to Hidden after the animation completes
                animatedUIState = AnimatedUIState.Hidden;
                panelParent.SetActive(false);
            });
        }
    }

    public void ToggleSpecialKillButton (bool State)
    {
        SpecialKillButton.SetActive(State);
    }
}
